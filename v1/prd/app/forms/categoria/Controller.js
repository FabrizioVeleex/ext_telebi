/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("prd.forms.categoria.controller.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.v1-prd-controller-categoria",

  requires: [
    "Ext.window.Toast",
    "prd.forms.categoria.Model",
    "prd.forms.categoria.controller.ManagerBtn",
    "prd.forms.categoria.controller.ManagerCards",
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
      Ext.create("prd.forms.categoria.Model", {
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
      managerBtn = Ext.create("prd.forms.categoria.controller.ManagerBtn"),
      managerCards = Ext.create("prd.forms.categoria.controller.ManagerCards");

    try {
      // Titolo tab
      vm.set("title", record.data["num_doc"] + " - " + record.data["rag_soc"] || "n.d.");
      vm.set("label", Locale.t("prd.forms.categoria.title"));
      vm.set("toolbar.hideCard", false);

      // Gestione tasti
      managerBtn.insertBtn();

      // Gesione Cards
      managerCards.cards();
    } catch (e) {
      // Nascondo tutti i tasti
      managerCards.error(vm);
      vm.set("panelinfo.consoleInfo", "<h3>" + Locale.t("global.error.generic") + "</h3>");
      console.log(e)
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


})
