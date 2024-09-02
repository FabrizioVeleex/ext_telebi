/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define("recpub.view.main.Controller", {
  extend: "portal.v1.public.main.Controller",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.main",
  requires: ["recpub.view.form.resi.Main"],
  onAfterRender: function () {
    this.panels = {
      resi: Ext.create("recpub.view.form.resi.Main", { itemId: "attive", setCfgPer: false }),
    };

    this.getView().add(this.panels.resi);
    this.getView().setActiveItem(this.panels.resi);
    this.callParent(arguments);
  },
  onRunApertura: function (r) {
    //apertura da notifica
  },
  onInfoUserApp: function (record) {
    // SpcUser = Ext.decode(record.responseText);
    // this.infoUserApp = Ext.decode(record.responseText);
  },
  onBeforeLoadMenuNode: function (store, operation) {
    if (!operation.node.get("root")) {
    }
  },
  onLoadStoreGrid: function (s) {},
});
