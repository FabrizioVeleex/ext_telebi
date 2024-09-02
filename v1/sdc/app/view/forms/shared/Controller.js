/**
 * Created by fabrizio on 15/10/2021.
 */
Ext.define("sdc.view.forms.shared.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.v1-shared",

  requires: [
    "Ext.form.FieldSet",
    "Ext.form.Panel",
    "Ext.form.field.ComboBox",
    "Ext.window.Window",
    "portal.v1.view.main.global.upload.Attach",
    "portal.v1.view.main.global.upload.CardAttach",
    "portal.v1.view.main.global.upload.GridAttachModel",
    "portal.v1.view.main.global.upload.GridAttachs",
    "sdc.model.forms.shared.GridMailto",
    "sdc.model.forms.shared.Model",
    "sdc.store.forms.shared.ListeCombo",
    "sdc.view.forms.shared.cards.GridMailto",
    "sdc.view.forms.shared.cards.Shared",
    'sdc.view.forms.shared.cards.GridLogDownload'
  ],
  init: function () {
    let vm = this.getViewModel();
    //tasti salva attivo e disabilita
    this.btnEdit = {
      ui: "green", text: Locale.t("sdc.forms.shared.btn.edit.text"), tooltip: Locale.t("sdc.forms.shared.btn.edit.tooltip"),
      iconCls: "x-fas fa-calendar", handler: "onEdit"
    };
    this.btnDisable = {
      ui: "red", text: Locale.t("sdc.forms.shared.btn.disable.text") + "...", tooltip: Locale.t("sdc.forms.shared.btn.disable.tooltip"),
      iconCls: "x-fas fa-trash", handler: "onDisable"
    };
    vm.set("isnew", this.getView().valori.isnew);
    vm.set("id", this.getView().valori.id);
    vm.set("record",
      Ext.create("sdc.model.forms.shared.Model", {
        id: this.getView().valori.id,
        isnew: this.getView().valori.isnew
      })
    );
    this.callParent(arguments);
  },
  managerView: function () {
    this.callParent(arguments);
    let me = this, vm = me.getViewModel(), record = vm.get("record"), readOnly = true, readOnlyAttach = true,
      hidewarning = true, readOnlyDate = true, hideDownload = true, hidearchived = true, hideprogetto = true;
    record.data.gestore = 0;
    //visibilità collegamento attività/progetti
    if (Ext.global.Vars.infoCli.cli === 'acrolcar') {
      hideprogetto = false;
    }
    this.btnSend = {
      ui: "green", text: Locale.t("sdc.forms.shared.btn.invia.text") + "...", tooltip: Locale.t("sdc.forms.shared.btn.invia.tooltip"),
      iconCls: "x-fas fa-check-square", handler: "onSave"
    };
    if (record.data.isnew === 1) {
      //imposto tutti i readOnly a false
      readOnly = false;
      readOnlyAttach = false;
      readOnlyDate = false;
    }
    if (this.checkRuoli(["99", "1"])) {
      vm.set("btn.cronology", true);
      if (record.data.isnew === 1) {
        hidewarning = false;
        readOnlyAttach = false;
        this.toolBar.add(this.btnSend);
      } else {
        if (record.data["disabled"] === 0) {
          readOnlyDate = false;
          this.toolBar.add(this.btnEdit);
          this.toolBar.add(this.btnDisable);
        }
      }
    }
    //visualizzo tasto download x documenti non archiviati
    if (record.data.isnew === 0 && record.data.disabled < 2) {
      hideDownload = false;
    }
    //gestione tasti default
    vm.set("btn.close", true);
    vm.set("readOnly", readOnly);
    vm.set("readOnlyDate", readOnlyDate);
    //titolo tab
    vm.set("title", record.data["subject"] || "n.d.");
    vm.set("label", Locale.t("sdc.forms.shared.title"));
    if (record.data["disabled"] === 2) {
      hidearchived = false; //visualizzo
    }
    vm.set("hidewarning", hidewarning); //avviso dimensioni files e velocità upload
    vm.set("hidearchived", hidearchived); //avviso dimensioni files e velocità upload
    vm.set("hideprogetto", hideprogetto); //collegamento con attività e progetti
    this.CardShared = Ext.create("sdc.view.forms.shared.cards.Shared");
    //caricamento files
    this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
    if (readOnlyAttach === false) {
      //inserisco tasto allegati
      if (!this.uploadfile) {
        this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttach");
      }
      this.cardAllegati.down("#updfile").add(this.uploadfile);
      this.uploadfile.fireEvent("updateInfo", {
        url: "", src: "", thumb: false, descrizione: "", readOnly: readOnly, rif: "", type: []
      });
    }
    this.gridAllegati = Ext.create("portal.v1.view.main.global.upload.GridAttachs");
    this.cardAllegati.down("#updgrid").add(this.gridAllegati);
    //carico allegati presenti
    let storeAllegati = this.getViewModel().get("storeAllegati");
    storeAllegati.removeAll();
    record.data.allegati.forEach(function (rec) {
      rec["readOnlyAttach"] = readOnlyAttach;
      rec["hideDownload"] = hideDownload;
      storeAllegati.add(
        Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec)
      );
    });
    this.CardShared.add(this.cardAllegati);
    //destinatari
    let storeMailto = this.getViewModel().getStore("storeMailto");
    storeMailto.loadData(record.data["mailto"]);
    if (!readOnly) {
      storeMailto.add(
        Ext.create("sdc.model.forms.shared.GridMailto", {
          action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), isread: false, mailto: ""
        })
      );
    }
    this.gridMailto = Ext.create("sdc.view.forms.shared.cards.GridMailto", {
      bind: {
        store: "{storeMailto}",
      },
    });
    this.cardmailto = Ext.create("Ext.form.FieldSet", {
      collapsible: true, collapsed: false, border: false,
      title:
        '<span style="color: black;font-weight: bold">' +
        Locale.t("sdc.forms.shared.fields.destinatari") +
        "</span>",
      items: [me.gridMailto],
    });
    this.CardShared.add(this.cardmailto);
    //log scaricamento
    if (record.data.isnew !== 1) {
      let storeDownloads = this.getViewModel().getStore("storeDownloads");
      storeDownloads.loadData(record.data["downloads"]);
      this.gridDownloads = Ext.create("sdc.view.forms.shared.cards.GridLogDownload",
        {
          bind: {
            store: "{storeDownloads}",
          }
        }
      );
      this.carddownloads = Ext.create("Ext.form.FieldSet", {
        collapsible: true, collapsed: false, border: false,
        title:
          '<span style="color: black;font-weight: bold">' +
          Locale.t("sdc.forms.shared.fields.downloads") +
          "</span>",
        items: [me.gridDownloads],
      });
      this.CardShared.add(this.carddownloads);
    }
    //form principale
    this.form.add(this.CardShared);
    this.getView().setActiveItem(this.form);
  },
  onEdit: function () {
    this.closeForm = false;
    this.onBeforeSave();
    this.onSaveNext();
  },
  onDisable: function () {
    let me = this;
    Ext.Msg.show({
      title: Locale.t("global.attenzione"),
      msg: "Disabilitare la condivisione di questo documento?",
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (btn) {
        if (btn === "yes") {
          me.onYesDisable();
        }
      }
    });
  },
  onYesDisable: function () {
    let vm = this.getViewModel(), record = vm.get("record");
    record.set("disabled", 1);
    vm.set("record", record);
    this.closeForm = true;
    this.onBeforeSave();
    this.onSaveNext();
  },
  onSave: function () {
    if (!this.obb()) {
      return false;
    }
    this.closeForm = true;
    this.onBeforeSave();
    this.onSaveNext();
  },
  onSaveNext: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record")

    let storeAllegati = this.getViewModel().getStore("storeAllegati");
    record.data["allegati"] = []; //inizializzo
    let removedAttach = []; //inizializzo array x rimuovere records cancellati
    let kk = 0;
    storeAllegati.each(function (rec) {
      if (rec.data.id !== "") {
        record.data["allegati"].push(rec.data);
        if (rec.data.action === 2) {
          removedAttach.push(kk);
        }
      }
      kk++;
    });
    //rimuovo records cancellati
    storeAllegati.remove(removedAttach);
    //lista mailto
    record.data["mailto"] = [];
    let storeMailto = this.getViewModel().getStore("storeMailto")
    storeMailto.each(function (rec) {
      if (rec.data["mailto"].trim() !== "") {
        record.data["mailto"].push(rec.data);
      }
    }, this);
    this.callParent(arguments);
  },
  obb: function () {
    let vm = this.getViewModel(), attach = vm.getStore("storeAllegati"), destinatari = vm.getStore("storeMailto"),
      record = vm.get("record").data, error = "";
    //altri campi
    if (record["datestop"] === null) {
      error += Locale.t("sdc.forms.shared.fields.datestop") + ": " + Locale.t("global.form.blanktext") + " <br>";
    }
    if (record["subject"] === "") {
      error += Locale.t("sdc.forms.shared.fields.subject") + ": " + Locale.t("global.form.blanktext") + " <br>";
    } else if (record["subject"].length > 150) {
      error += Locale.t("sdc.forms.shared.fields.subject") + ": " + Locale.t("global.lunghezzaMassima") + " 150<br>";
    }
    //allegati
    if (attach.data.length === 0) {
      error += Locale.t("sdc.forms.shared.fields.attach") + ": " + Locale.t("sdc.forms.shared.errori.obbdocs") + " <br>";
    }
    //destinatari
    let t = 0;
    for (let arrayElement of destinatari.data.items) {
      if (arrayElement.data["mailto"].trim() !== "") {
        t++;
      }
    }
    if (t === 0) {
      error += Locale.t("sdc.forms.shared.fields.destinatari") + ": " + Locale.t("sdc.forms.shared.errori.obbdest") + " <br>";
    }
    if (error !== "") {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        msg: error,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
      });
      return false;
    }
    return true;
  },
  isValidEmailAddress: function isValidEmailAddress(address) {
    let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !!address.match(mailformat);
  },
  //azioni allegati (il get attach è personalizzato rispetto al package)
  onGetAttach: function (grid, rowIndex) {
    let rec = grid.getStore().getAt(rowIndex);
    if (rec.data.hideDownload === "true") {
      return false;
    }
    let me = this;
    me.getView().el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      url: Backend.REST_VERSION + "getattach",
      method: "POST",
      jsonData: {
        data: rec.data,
        iduser: Ext.global.Vars.infoUser.id,
        username: Ext.global.Vars.infoUser.email,
        tag: Ext.global.Vars.infoApp.version.tagapp
      },
      success: function (response) {
        me.getView().el.unmask();
        let resp = Ext.decode(response.responseText);
        me.onDownloadFile(resp["token"]);
      },
      failure: function (response) {
        me.getView().el.unmask();
        let resp = Ext.decode(response.responseText);
        let errore =
          Locale.t("global.attach.errordownload") + ": " + resp["msg"];
        Ext.Msg.show({
          title: Locale.t("global.errore"),
          msg: errore,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR,
        });
      }
    });
  },
  onReturnRequestAttach: function (res) {
    let me = this, vm = me.getViewModel(),
      store = vm.getStore("storeAllegati");
    res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
    res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
    store.add(
      Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
    );
  },
  //liste distribuzione
  addLista: function () {
    let me = this;
    //creo la finestra di inoltro
    let btnX = new Ext.Button({
      text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban",
      handler: function () {
        wndw.destroy();
      },
    });
    let btnConfirm = Ext.create("Ext.Button", {
      text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
      handler: function () {
        let ff = wdwpanel.getForm();
        let idlista = ff.findField("idlista").getValue(); //destinatari email
        if (!idlista) {
          Ext.Msg.show({
            title: Locale.t("global.attenzione"),
            msg: Locale.t("sdc.forms.shared.btn.lista.obb"),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR,
          });
          return;
        }
        wndw.destroy();
        me.view.el.mask(Locale.t("sdc.forms.shared.btn.lista.recupero"));
        Ext.Ajax.request({
          method: "POST",
          jsonData: { idlista: idlista },
          url: Backend.REST_API + "forms/shared/recuperaelenco", //azione flusso generica passando lo step
          success: function (record) {
            me.view.el.unmask();
            let rec = Ext.decode(record.responseText);
            let store = me.getViewModel().getStore("storeMailto");
            let firstrec = store.last();
            if (firstrec.data.mailto === "") {
              store.remove(firstrec);
            }
            rec["elenco"].forEach(function (elemento) {
              store.add(
                Ext.create("sdc.model.forms.shared.GridMailto", {
                  action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), isread: false,
                  mailto: elemento["email"], contact: elemento["nominativo"], ragsoc: elemento["lista"]
                })
              );
            });
            store.add(
              Ext.create("sdc.model.forms.shared.GridMailto", {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), isread: false, mailto: ""
              })
            );
            me.gridMailto.getView().refresh();
          },
          failure: function (response) {
            me.getView().el.unmask();
            let resp = Ext.decode(response.responseText);
            Ext.Msg.show({
              title: Locale.t("global.errore"),
              msg: resp["msg"],
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.ERROR,
            });
          },
        });
      },
    });
    let wdwpanel = Ext.create("Ext.form.Panel", {
      border: false,
      items: [
        {xtype: "combo", editable: true, width: 500, fieldLabel: Locale.t("sdc.forms.shared.btn.lista.seleziona"),
          name: "idlista", displayField: "nome", valueField: "id", value: "",
          store: Ext.create("sdc.store.forms.shared.ListeCombo")
        }
      ]
    });
    let wndw = Ext.create("Ext.Window", {
      tbar: [btnX, btnConfirm], title: Locale.t("sdc.forms.shared.btn.lista.inserisci"), width: 550,
      scrollable: true, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
      modal: true, border: false, resizable: false, draggable: false, items: [wdwpanel]
    });
    wndw.show();
  }
});
