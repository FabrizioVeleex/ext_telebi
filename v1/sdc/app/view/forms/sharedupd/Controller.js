/**
 * Created by fabrizio on 15/10/2021.
 */
Ext.define("sdc.view.forms.sharedupd.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.v1-sharedupd",

  requires: [
    'Ext.form.FieldSet',
    'portal.v1.view.main.global.upload.CardAttach',
    'portal.v1.view.main.global.upload.GridAttachModel',
    'portal.v1.view.main.global.upload.GridAttachs',
    'sdc.model.forms.sharedupd.GridMailto',
    'sdc.model.forms.sharedupd.Model',
    'sdc.view.forms.sharedupd.cards.GridLogDownload',
    'sdc.view.forms.sharedupd.cards.GridMailto',
    'sdc.view.forms.sharedupd.cards.Sharedupd'
  ],
  init: function () {
    let vm = this.getViewModel();
    //tasti salva attivo e disabilita
    this.btnEdit = {
      ui: "green", text: Locale.t("sdc.forms.sharedupd.btn.edit.text"), tooltip: Locale.t("sdc.forms.sharedupd.btn.edit.tooltip"),
      iconCls: "x-fas fa-calendar", handler: "onEdit"
    };
    this.btnDisable = {
      ui: "red", text: Locale.t("sdc.forms.sharedupd.btn.disable.text") + "...", tooltip: Locale.t("sdc.forms.sharedupd.btn.disable.tooltip"),
      iconCls: "x-fas fa-trash", handler: "onDisable"
    };
    vm.set("isnew", this.getView().valori.isnew);
    vm.set("id", this.getView().valori.id);
    vm.set("record",
      Ext.create("sdc.model.forms.sharedupd.Model", {
        id: this.getView().valori.id,
        isnew: this.getView().valori.isnew
      })
    );
    this.callParent(arguments);
  },
  managerView: function () {
    this.callParent(arguments);
    let me = this, vm = me.getViewModel(), record = vm.get("record"), readOnly = true,readOnlyDate = true, hidearchived = true;
    record.data.gestore = 0;
    this.btnSend = {
      ui: "green", text: Locale.t("sdc.forms.sharedupd.btn.invia.text") + "...", tooltip: Locale.t("sdc.forms.sharedupd.btn.invia.tooltip"),
      iconCls: "x-fas fa-check-square", handler: "onSave"
    };
    if (record.data.isnew === 1) {
      //imposto tutti i readOnly a false
      readOnly = false;
      readOnlyDate = false;
    }
    if (this.checkRuoli(["99", "2"])) {
      vm.set("btn.cronology", true);
      if (record.data.isnew === 1) {
        this.toolBar.add(this.btnSend);
      } else {
        if (record.data["disabled"] === 0) {
          readOnlyDate = false;
          this.toolBar.add(this.btnEdit);
          this.toolBar.add(this.btnDisable);
        }
      }
    }
    //gestione tasti default
    vm.set("btn.close", true);
    vm.set("readOnly", readOnly);
    vm.set("readOnlyDate", readOnlyDate);
    //titolo tab
    vm.set("title", record.data["subject"] || "n.d.");
    vm.set("label", Locale.t("sdc.forms.sharedupd.title"));
    if (record.data["disabled"] === 2) {
      hidearchived = false; //visualizzo
    }
    vm.set("hidearchived", hidearchived); //avviso dimensioni files e velocità upload
    this.CardShared = Ext.create("sdc.view.forms.sharedupd.cards.Sharedupd");
    if (record.data.isnew !== 1) {
      //caricamento files
      this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
      this.gridAllegati = Ext.create("portal.v1.view.main.global.upload.GridAttachs");
      this.cardAllegati.down("#updgrid").add(this.gridAllegati);
      //carico allegati presenti
      let storeAllegati = this.getViewModel().get("storeAllegati");
      storeAllegati.removeAll();
      record.data.allegati.forEach(function (rec) {
        rec["readOnlyAttach"] = true;
        rec["hideDownload"] = false;
        storeAllegati.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec)
        );
      });
      this.CardShared.add(this.cardAllegati);
    }
    let storeMailto = this.getViewModel().getStore("storeMailto");
    storeMailto.loadData(record.data["mailto"]);
    if (!readOnly) {
      storeMailto.add(
          Ext.create("sdc.model.forms.sharedupd.GridMailto", {
            action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), isread: false, mailto: ""
          })
      );
    }
    this.gridMailto = Ext.create("sdc.view.forms.sharedupd.cards.GridMailto", {
      bind: {
        store: "{storeMailto}",
      },
    });
    this.cardmailto = Ext.create("Ext.form.FieldSet", {
      collapsible: true, collapsed: false, border: false,
      title:
          '<span style="color: black;font-weight: bold">' +
          Locale.t("sdc.forms.sharedupd.fields.destinatari") +
          "</span>",
      items: [me.gridMailto],
    });
    this.CardShared.add(this.cardmailto);
    //log scaricamento
    if (record.data.isnew !== 1) {
      let storeDownloads = this.getViewModel().getStore("storeDownloads");
      storeDownloads.loadData(record.data["downloads"]);
      this.gridDownloads = Ext.create("sdc.view.forms.sharedupd.cards.GridLogDownload",
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
            Locale.t("sdc.forms.sharedupd.fields.downloads") +
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
      msg: "Disabilitare la richiesta condivisione?",
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
    let vm = this.getViewModel(), destinatari = vm.getStore("storeMailto"),
      record = vm.get("record").data, error = "";
    //altri campi
    if (record["datestop"] === null) {
      error += Locale.t("sdc.forms.sharedupd.fields.datestop") + ": " + Locale.t("global.form.blanktext") + " <br>";
    }
    if (record["subject"] === "") {
      error += Locale.t("sdc.forms.sharedupd.fields.subject") + ": " + Locale.t("global.form.blanktext") + " <br>";
    } else if (record["subject"].length > 150) {
      error += Locale.t("sdc.forms.sharedupd.fields.subject") + ": " + Locale.t("global.lunghezzaMassima") + " 150<br>";
    }
    //destinatari
    let t = 0;
    for (let arrayElement of destinatari.data.items) {
      if (arrayElement.data["mailto"].trim() !== "") {
        t++;
      }
    }
    if (t === 0) {
      error += Locale.t("sdc.forms.sharedupd.fields.destinatari") + ": " + Locale.t("sdc.forms.sharedupd.errori.obbdest") + " <br>";
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
    let me = this;
    me.getView().el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      url: Backend.REST_VERSION + "getattach",
      method: "POST",
      jsonData: {
        data: rec.data,
        iduser: Ext.global.Vars.infoUser.id,
        username: Ext.global.Vars.infoUser.nomecognome,
        tag: Ext.global.Vars.infoApp.version.tagapp,
        logtable:'TBSDCLOG03'
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
  }
});
