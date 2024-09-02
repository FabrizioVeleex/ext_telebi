/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define("stt.view.main.Controller", {
  extend: "portal.v1.view.main.ViewController",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.main",
  requires: [
    "portal.v1.view.main.TreeMenu",
    "portal.v1.view.main.TreeMenuAmm",
    "stt.view.forms.ritardi.Panel",
    "stt.view.grids.clienti.Grid",
    "stt.view.grids.moduli.Grid",
    'stt.view.forms.vendite.Panel'
  ],
  onAfterRender: function () {
    let vm = this.getViewModel();
    //costruisco array viste
    this.panels = {
      ritardi: Ext.create("stt.view.forms.ritardi.Panel", { itemId: "ritardi", setCfgPer: true }), //ritardi
      vendite: Ext.create("stt.view.forms.vendite.Panel", { itemId: "vendite", setCfgPer: true }), //vendite annuali
     // previsione: Ext.create("stt.view.forms.previsione.Panel", { itemId: "previsione", setCfgPer: true }), // calcolo previsione
      // obbiettivi: Ext.create("stt.view.grids.obbiettivi.Grid", { itemId: "obbiettivi", setCfgPer: true }), // calcolo obbiettivi
      //menubudget: Ext.create("Ext.panel.Panel", { itemId: "menubudget", setCfgPer: true, html: "Espadere vista per la lista budget" }),

      moduli: Ext.create("stt.view.grids.moduli.Grid", { itemId: "moduli", setCfgPer: false }), //moduli disponibili
      clienti: Ext.create("stt.view.grids.clienti.Grid", { itemId: "clienti", setCfgPer: false }), // associazione codic cliente
    };
    if (this.checkRuoli(["99"])) {
      vm.set("titleMenuMain", Locale.t("stt.main.treemenu"));
      this.mainMenu = Ext.create("portal.v1.view.main.TreeMenu");
      vm.set("titleMenuAmm", Locale.t("stt.main.treemenuamm"));
      this.ammMenu = Ext.create("portal.v1.view.main.TreeMenuAmm");
    } else {
      this.mainMenu = Ext.create("portal.v1.view.main.TreeMenu");
    }
    this.callParent(arguments);
  },
  onRunApertura: function (r, view) {
    //apertura da notifica
  },
  onInfoUserApp: function (record) { },
  onBeforeLoadMenuNode: function (store, operation) {
    if (!operation.node.get("root")) {
    }
  },
  onLoadStoreGrid: function (s) {

  },
  onitemclick: function (pnl, node) {
    // verifico se ho clicato su un anno di un budget per aprire form budget
    /*
    if (node.data && node.data.idPadre && node.data.idPadre === 'menubudget') {
      if (!this.panels[node.data.itemId]) {
        this.panels[node.data.itemId] = Ext.create("stt.view.forms.budget.Panel", { itemId: node.data.itemId, closable: false, setCfgPer: true })
      }
    }
    */
    // Esegio funzioni globali standard
    this.callParent(arguments);
  }
});
