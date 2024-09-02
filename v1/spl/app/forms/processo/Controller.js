/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define("spl.forms.processo.controller.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  mixins: [
    "portal.v1.global.Util",
    "spl.forms.processo.controller.SpoolController",
    "spl.forms.processo.controller.JsonController"
  ],
  alias: "controller.v1-controller-processo",

  requires: [
    "Ext.window.Toast",
    "spl.forms.processo.Model",
    "spl.forms.processo.controller.ManagerBtn",
    "spl.forms.processo.controller.ManagerCards",
    'Ext.layout.container.Fit'
  ],
  init: function () {
    let vm = this.getViewModel();
    vm.set("isnew", this.getView().valori.isnew);
    vm.set("id", this.getView().valori.id);
    vm.set("tag", this.getView().record.data.tag);
    vm.set(
      "record",
      Ext.create("spl.forms.processo.Model", {
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
      managerBtn = Ext.create("spl.forms.processo.controller.ManagerBtn"),
      managerCards = Ext.create("spl.forms.processo.controller.ManagerCards");

    try {
      // Titolo tab
      vm.set("title", record.data.json && record.data.json.nameFile ? record.data.json.nameFile : "n.d.");
      vm.set("label", Locale.t("spl.forms.processo.title"));
      vm.set("toolbar.hideCard", false);
      vm.set("readOnly", true);

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
});
