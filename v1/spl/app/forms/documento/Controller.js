/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("spl.forms.documento.controller.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  mixins: [
    "portal.v1.global.Util",
    "spl.forms.documento.cards.spool.SpoolController",
    "spl.forms.documento.cards.json.JsonController",
    "spl.forms.documento.component.mail.MailController",
    "spl.forms.documento.cards.json.InfoController",
    "spl.forms.documento.component.fieldAssociazione.Controller_mixin"
  ],
  alias: "controller.v1-spl-form-documento",

  requires: [
    "spl.forms.documento.Model",
    "spl.forms.documento.controller.ManagerBtn",
    "spl.forms.documento.controller.ManagerCards",
    "spl.global.firma.Windows",
    "Ext.window.Toast",
    'Ext.drag.Target',
    'Ext.layout.container.Fit'
  ],
  init: function () {
    let vm = this.getViewModel();
    vm.set("isnew", this.getView().valori.isnew);
    vm.set("id", this.getView().valori.id);
    vm.set("tag", this.getView().record.data.tag);
    vm.set(
      "record",
      Ext.create("spl.forms.documento.Model", {
        id: this.getView().valori.id,
        isnew: this.getView().valori.isnew,
        tag: this.getView().record.data.tag,
      })
    );
    this.callParent(arguments);
  },

  managerView: function () {
    this.callParent(arguments);
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record"),
      managerBtn = Ext.create("spl.forms.documento.controller.ManagerBtn"),
      managerCards = Ext.create("spl.forms.documento.controller.ManagerCards");

    try {
      // Titolo tab
      vm.set("title", record.data["num_doc"] + " - " + record.data["rag_soc"] || "n.d.");
      vm.set("label", Locale.t("spl.forms.documento.title"));
      vm.set("toolbar.hideCard", false);

      // Gestione tasti
      managerBtn.insertBtn(me, record);

      // Gesione Cards
      managerCards.cards(me, record);
    } catch (e) {

      // Nascondo tutti i tasti
      managerCards.error(vm);
      vm.set("panelinfo.consoleInfo", "<h3>" + Locale.t("global.form.openerror") + "</h3>");
      this.getView().setActiveItem(this.panelInfo);
      this.onAfterLoadFailure();
    }
  },

  onSave: function () {
    let me = this,
      vm = me.getViewModel();
    if (!this.obb()) {
      return false;
    }

    // recupero dati destinazione differente
    vm.set("record.destinazione", vm.get("destinazione"));

    // this.form.removeAll(true);
    this.callParent(arguments);
  },

  obb: function () {
    let info = this.listForms[0].card.getForm();
    if (!info.isValid()) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        message: Locale.t("global.form.validation.form") + " " + this.listForms[0].posizione,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
      });
      return false;
    }
    return true;
  },

  //----------------------------------------------------------------
  // Scarta documento
  onScarta: function () {
    let me = this,
      record = this.getViewModel().get('record');

    // Chiedo conferma x eseguire la cancellazione
    Ext.Msg.show({
      title: Locale.t('spl.forms.documento.btn.scarta.text'),
      iconCls: 'x-fas fa-trash',
      message: Locale.t('spl.forms.documento.btn.scarta.message'),
      buttons: Ext.Msg.YESNO,
      icon: Ext.MessageBox.QUESTION,
      fn: function (b) {
        if (b === 'yes') {
          Ext.Ajax.request({
            method: "DELETE",
            jsonData: { record: record.data },
            url: Backend.REST_API + "forms/documento/" + record.data.id + "?isnew=0&tag=" + record.data.tag,
            success: function () {
              me.refreshGrid = true;
              me.onClose();
            },
            failure: function (response) {
              try {
                Ext.Msg.show({
                  title: Locale.t('global.attenzione'),
                  message: response.statusText,
                  buttons: Ext.Msg.OK,
                  icon: Ext.MessageBox.ERROR
                });
              } catch (e) {
                Ext.Msg.show({
                  title: Locale.t('global.attenzione'),
                  message: e.message,
                  buttons: Ext.Msg.OK,
                  icon: Ext.MessageBox.ERROR
                });
              }
            }
          });
        }
      }
    });
  },

  //----------------------------------------------------------------
  // Firmo pdf
  onSignPdf: function () {
    try {
      //TODO controllare se il documento è valido
      let me = this,
        vm = me.getViewModel(),
        record = vm.get("record");

      let totDocOK = 0, totDocKo = 0, recordPrint = []
      if (record.data.cd_sogg_fat === "" || record.data.spool === -2 || record.data.spool === 0) {
        totDocKo++;
      } else {
        totDocOK++;
        recordPrint.push(record.data);
      }
      let win = Ext.create("spl.global.firma.Windows", {
        recordPrint: recordPrint,
        recordsGood: [record.data],
        totDocOK: totDocOK,
        totDocKo: totDocKo,
        single: true
      });
      win.show();
      win.on("closeFirmaOk", this.onSignPdfClose, this);
    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },
  onSignPdfClose: function () {
    this.onSave();
  },
  //----------------------------------------------------------------
  // Scarco formato excel
  onDwnExcel: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");
    Ext.Ajax.request({
      url: Backend.REST_API + "functions/form/getfilexlsx/",
      method: "POST",
      binary: true,
      jsonData: {
        record: { ...record.data },
      },
      success: function (response) {
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        let headers = response.getAllResponseHeaders()
        let fileName = response.getResponseHeader('Content-Disposition').split("filename=")[1]
        if (fileName === '') { //se non ho filename di ritorno (eccezione) do un nome generico
          fileName = 'Download_file.xlsx'
        }
        let blob = new Blob([response.responseBytes], { type: headers['content-type'] })
        let binaryFile = window.URL.createObjectURL(blob)
        a.href = binaryFile
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(binaryFile)
      },
      failure: function (response) {
        // noinspection JSUnresolvedVariable
        // let errore = Locale.t("bol.forms.documento.errore") + ": " + response.statusText;
        // me.listForms[1].card.add({xtype: "box", html: errore});
      },
    });
  },

  //----------------------------------------------------------------
  // Gestione anteprima pdf
  onShowPdf: function (pnl) {
    if (pnl.preview === true) {
      return;
    }
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");

    pnl.preview = true
    Ext.Ajax.request({
      url: Backend.REST_API + "functions/form/getfilepdf/",
      method: "POST",
      binary: true,
      jsonData: {
        record: { ...record.data, firma: pnl.posizione, tipodoc: "BOL" },
      },
      success: function (response) {
        let headers = response.getAllResponseHeaders();
        let blob = new Blob([response.responseBytes], { type: headers["content-type"] });
        let binarypdf = window.URL.createObjectURL(blob);
        let cardtmp = me.listForms.filter((obj) => {
          return obj.posizione === pnl.posizione;
        });
        if (cardtmp.length === 1) {
          cardtmp[0].card.add({
            xtype: "component",
            layout: "fit",
            autoEl: {
              tag: "iframe",
              width: "100%",
              height: "100%",
              style: "border: none",
              src: binarypdf, //immagine binaria di ritorno
            },
          });

        } else {
          me.onErrorShowPdf(pnl)
        }
      },
      failure: function () {
        me.onErrorShowPdf(pnl)
      },
    });
  },



  onErrorShowPdf: function (pnl) {
    let me = this;
    let cardtmp = me.listForms.filter((obj) => {
      return obj.posizione === pnl.posizione;
    });
    if (cardtmp.length === 1) {
      cardtmp[0].card.add({
        xtype: "fieldset",
        cls: "app-container y-imagerror-pdf",
        style: { "background-color": "#f57070" },
        items: [
          {
            xtype: "box",
            cls: "all-font-medium",
            style: { "text-align": "center" },
            flex: 1,
            bind: {
              html: "Documento non trovato",
            },
          },
          { xtype: "image", alt: 'error_image', src: "/images/error.png" },
        ],
      });
    } else {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: "Documento non trovato",
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });

    }

  },

  onBuildPdf: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");
    Ext.Ajax.request({
      url: Backend.REST_API + "functions/form/recompilespool/",
      method: "POST",
      params: {
        id: record.data["id"],
      },
      success: function () {
        Ext.toast({
          html: 'Avvio rigenerazione pdf',
          closable: false,
          align: 't',
          slideInDuration: 400,
          minWidth: 400
        });
      },
      failure: function () {
        Ext.toast({
          html: 'Errore rigenerazione pdf',
          closable: false,
          align: 't',
          slideInDuration: 400,
          minWidth: 400
        });
      },
    });
  },

  onDownloafSpoolOriginPdf: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");

    Ext.Ajax.request({
      method: "POST",
      jsonData: { id: record.data.id },
      binary: true,
      url: Backend.REST_API + "functions/form/getfilespool/",
      success: function (response) {
        //imposto un elemento nascosto x fare il download con il nome file che mi arriva
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style.cssText = "display: none";
        let headers = response.getAllResponseHeaders();
        let fileName = response
          .getResponseHeader("Content-Disposition")
          .split("filename=")[1];
        if (fileName === "") {
          //se non ho filename di ritorno (eccezione) do un nome generico
          fileName = "spool.pdf";
        }
        let blob = new Blob([response.responseBytes], {
          type: headers["content-type"],
        });
        let binaryFile = window.URL.createObjectURL(blob);
        a.href = binaryFile;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(binaryFile);
        Ext.toast({
          html: 'Avvio scaricamento spool pdf',
          closable: false,
          align: 't',
          slideInDuration: 400,
          minWidth: 400
        });
      },
      failure: function () {
        Ext.toast({
          html: 'Errore scaricamento spool pdf',
          closable: false,
          align: 't',
          slideInDuration: 400,
          minWidth: 400
        });
      },
    });
  },
  dupOpenDbl: function (grid, record, item, index, e, eOpts) {
    this.runDupOpen(record)
  },
  dupOpen: function (view, rowIndex, colIndex, item, opt, record) {
    this.runDupOpen(record)
  },
  runDupOpen: function (record) {
    let me = this,
      itemId = record.data['id'],
      tab = me.form.child('#f' + itemId);

    if (tab) {
      me.form.setActiveItem(tab);
      return true
    }

    const datastampa = Ext.Date.format(new Date(record.data.creationdate), "d/m/Y h:i:s");;

    let newTab = {
      posizione: 'f' + itemId,
      backgroundColor: "LightBlue",
      card: Ext.create("Ext.form.Panel", {
        posizione: 'f' + itemId,
        tag: record.data['tag'],
        id_duplicato: itemId,
        scrollable: "y",
        itemId: 'f' + itemId,
        preview: false,
        listeners: {
          show: "onShowPdfDup",
        },
      }),
      text: Locale.t("spl.forms.documento.infodoc"),
      btn: {
        xtype: "splitbutton",
        text: 'Dup.:' + datastampa,
        iconCls: "icon-pdf",
        posizione: 'f' + itemId,
        tag: record.data['tag'],
        id_duplicato: itemId,
        ui: 'ocra',
        handler: "onClickCardPdf",
        enableToggle: true,
        userCls: 'y-arrow-button-right',
        listeners: {
          arrowclick: "onClickCardPdfClose"
        }
      }
    }


    me.toolBarCard.add(newTab.btn)
    me.listForms.push(newTab)

    me.form.add(newTab.card);
    me.form.setActiveItem(newTab.card);

    me.onClickCard({
      posizione: "f" + itemId,
    });

  },

  onClickCardPdf: function (btn) {
    let me = this,
      itemId = btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.setActiveItem(tab);

    me.onClickCard({
      posizione: btn['posizione'],
    });
  },

  onClickCardPdfClose: function (btn) {
    let me = this,
      itemId = btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.remove(tab);
    me.toolBarCard.remove(btn)
    me.listForms = me.listForms.filter((obj) => {
      return obj.posizione !== btn.posizione;
    });

    me.onClickCard({
      posizione: "info",
    });
  },

});
