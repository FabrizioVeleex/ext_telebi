Ext.define("ord.forms.documento.controller.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.v1-controller-documento",

  requires: [
    "Ext.window.Toast",
    "ord.forms.documento.Model",
    "ord.forms.documento.controller.ManagerBtn",
    "ord.forms.documento.controller.ManagerCards",
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
      Ext.create("ord.forms.documento.Model", {
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
      managerBtn = Ext.create("ord.forms.documento.controller.ManagerBtn"),
      managerCards = Ext.create("ord.forms.documento.controller.ManagerCards");

    try {
      // Titolo tab
      vm.set("title", record.data["num_doc"] + " - " + record.data["rag_soc"] || "n.d.");
      vm.set("label", Locale.t("ord.forms.documento.title"));
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
    let me = this;
    if (!this.obb()) {
      return false;
    }

    this.form.removeAll(true);
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
  // Store Combo Associa soggetto
  onBeforeLoadComboSogg: function (store) {
    if (store.isLoading()) return false;
    let vm = this.getViewModel(), record = vm.get('record')
    store.getProxy().extraParams.tiposoggetto = record.data.tipo_sogg;
  },
  onSelectComboSogg: function (combo, rec) {
    let vm = this.getViewModel(), record = vm.get('record')
    record.set('idsoggettonew', rec.data.id);
    record.set('codice', rec.data.codice);

  },

  onChangeRadioTipoSogg: function (radio, newValue, oldValue) {
    let vm = this.getViewModel(), record = vm.get('record');
    this.getView().down('#comboSogg').setValue('');
    if (newValue !== undefined && newValue !== "X") {
      this.getView().down('#comboSogg').enable();
    } else {
      if (record.data.tipo_sogg !== 'C' && record.data.tipo !== 'F') {
        this.getView().down('#comboSogg').disable();
      } else {
        this.getView().down('#comboSogg').enable();
      }
    }
    record.set('idsoggettonew', "");
    record.set('codice', "");
  },

  //----------------------------------------------------------------
  // Scarta documento
  onScarta: function () {
    let me = this,
      record = this.getViewModel().get('record');

    // Chiedo conferma x eseguire la cancellazione
    Ext.Msg.show({
      title: Locale.t('ord.forms.documento.btn.scarta.text'),
      iconCls: 'x-fas fa-trash',
      message: Locale.t('ord.forms.documento.btn.scarta.message'),
      buttons: Ext.Msg.YESNO,
      icon: Ext.MessageBox.QUESTION,
      fn: function (b) {
        if (b === 'yes') {
          Ext.Ajax.request({
            method: "PUT",
            jsonData: { record: record.data },
            url: Backend.REST_API + "forms/documento/scarta/",
            success: function () {
              me.gridReload = true;
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
  // Scarco formato excel
  onDwnExcel: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");
    Ext.Ajax.request({
      url: Backend.REST_API + "forms/documento/getxls/",
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
        // let errore = Locale.t("ord.forms.documento.errore") + ": " + response.statusText;
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
      url: Backend.REST_API + "forms/documento/getpdf/",
      method: "POST",
      binary: true,
      jsonData: {
        record: { ...record.data, firma: pnl.posizione, tipodoc: "ORD" },
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


  onShowPdfDup: function (pnl) {
    if (pnl.preview === true) {
      return;
    }
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");

    pnl.preview = true
    Ext.Ajax.request({
      url: Backend.REST_API + "forms/documento/getpdfdup/",
      method: "POST",
      binary: true,
      jsonData: {
        record: { ...record.data, id_duplicato: pnl.posizione, tipodoc: "ORD" },
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
          }
          );
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
              html: Locale.t("ord.forms.documento.docnotfound"),
            },
          },
          { xtype: "image", alt: 'error_image', src: "/images/error.png" },
        ],
      });
    } else {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t("ord.forms.documento.docnotfound"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });

    }

  },
  onSendNewEmail: function () {
    let me = this,
      vm = me.getViewModel(),
      email = vm.get("email"),
      record = vm.get("record");
    email.mailto = record.data.mailto;
    const mailto = email.mailto && email.mailto.length > 0 ? email.mailto : false;

    if (!mailto) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        message: Locale.t("global.form.validation.form") + " " + Locale.t("ord.forms.documento.fields.mailto.label"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
      });
      return false;
    }
    me.view.el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      method: "POST",
      jsonData: { record: record.data, email: email },
      url: Backend.REST_API + "global/sendmail/",
      success: function (res) {
        me.view.el.unmask();

        // Abilito card info
        // let storemail = vm.getStore("storemail");
        // storemail.loadData(record.data.send);
        // me.onClickCard({ posizione: 'info' }); //TODO da aggiungere ma è necessario refreshare il suo contenuto prima

        // Svuoto i valori della email
        vm.set('email', {
          subject: "",
          corpo: "",
          mailto: [],
          mailfrom: "",
          listAttach: [],
          replyTo: ""
        });

        // Avviso invio email con successo
        Ext.toast({
          html: Locale.t("ord.forms.documento.sendmail.successsend"),
          closable: false,
          align: 't',
          slideInDuration: 400,
          minWidth: 400
        });

      },
      failure: function () {
        me.view.el.unmask();
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          message: Locale.t("ord.forms.documento.sendmail.errorsend"),
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR,
        });
      }
    });
  },

  onUploadAttach: function (field, value) {
    if (!value) {
      return; //ho annullato
    }

    this.onDrop(null, field.fileInputEl.dom);


  },
  afterRenderNewEmail: function (view) {
    let body = view.body;

    if (window.File && window.FileList && window.FileReader) {
      this.target = new Ext.drag.Target({
        element: body,
        listeners: {
          scope: this,
          dragenter: this.onDragEnter,
          dragleave: this.onDragLeave,
          drop: this.onDrop
        }
      });
    } else {
      body.down('.drag-file-label').setHtml(
        'File dragging is not supported by your browser'
      );
      body.el.addCls('nosupport');
    }
  },

  onDragEnter: function () {
    const b = this.getView().down("#v1-ord-dragattach");
    b.body.addCls('dd-active');
  },

  onDragLeave: function () {
    const b = this.getView().down("#v1-ord-dragattach");
    b.body.removeCls('dd-active');
  },
  onDrop: function (target, info) {
    let me = this,
      vm = me.getViewModel(),
      view = me.getView(),
      progress = view.down("progress"),
      panelDrop = view.down("#v1-ord-dragattach"),
      tagAttach = view.down('v1-ord-tagattach-combo'),
      files, len, s;
    files = info.files;
    len = files.length;

    if (len > 1) {
      s = 'Dropped ' + len + ' files.';
    } else {
      s = 'Dropped ' + files[0].name;
    }

    panelDrop.body.removeCls('dd-active');
    let formData = new FormData();
    for (let file of files) {
      formData.append('multi-files', file, file.name);
    }

    let oReq = new XMLHttpRequest();
    oReq.responseType = 'json';
    oReq.open("post", Backend.REST_API + 'uploadFiles/', true);
    oReq.setRequestHeader("token", Ext.global.Vars.infoUser.token); //autorizzazione chiamata

    oReq.upload.addEventListener("progress", function (oEvent) {
      if (oEvent.lengthComputable) {
        panelDrop.hide();
        progress.setHeight(24);
        let p = oEvent.loaded / oEvent.total;
        progress.setValue(p);
        progress.setText(Locale.t('global.upload.message.progress') + ' ' + (p * 100).toFixed(0) + '%');
      }
    });

    oReq.addEventListener("loadend", function (e) {
      if (e.currentTarget.status === 200) {
        let email = vm.get('email');
        for (let valore of e.currentTarget.response.valori) {
          let checkDup = email.listAttach.filter(val => val.file.toLowerCase() !== valore.file.toLowerCase());
          email.listAttach = [valore, ...checkDup];
          tagAttach.addValue(valore.file);
        }
      } else {
        s = Locale.t("ord.forms.documento.errors.fileupload");
      }
      progress.setHeight(0);
      panelDrop.show();
      Ext.toast({
        html: s,
        closable: false,
        align: 't',
        slideInDuration: 400,
        minWidth: 400
      });
    });

    oReq.addEventListener("error", function () {
      Ext.toast({
        html: Locale.t("ord.forms.documento.errors.fileuploadsm"),
        closable: false,
        align: 't',
        slideInDuration: 400,
        minWidth: 400
      });
    });
    oReq.send(formData);
  },
  onBuildPdf: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");
    Ext.Ajax.request({
      url: Backend.REST_API + "forms/documento/buildpdf/",
      method: "POST",
      params: {
        id: record.data["id"],
      },
      success: function () {
        Ext.toast({
          html: Locale.t("ord.forms.documento.pdf.regenerationstart"),
          closable: false,
          align: 't',
          slideInDuration: 400,
          minWidth: 400
        });
      },
      failure: function () {
        Ext.toast({
          html: Locale.t("ord.forms.documento.pdf.regenerationerror"),
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
      url: Backend.REST_API + "forms/documento/filespoolpdf/",
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
    let newTab = {
      posizione: 'f' + itemId,
      backgroundColor: "LightBlue",
      card: Ext.create("Ext.form.Panel", {
        posizione: 'f' + itemId,
        scrollable: "y",
        itemId: 'f' + itemId,
        preview: false,
        listeners: {
          show: "onShowPdfDup",
        },
      }),
      text: Locale.t("ord.forms.documento.infodoc"),
      btn: {
        xtype: "splitbutton",
        text: record.data.creationdate,
        iconCls: "icon-pdf",
        posizione: 'f' + itemId,
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
