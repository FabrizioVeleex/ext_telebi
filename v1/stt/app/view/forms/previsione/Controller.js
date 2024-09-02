/**
 * Created by fabrizio on 03/12/2022.
 */
Ext.define("stt.view.forms.previsione.Controller", {
  extend: "portal.v1.view.forms.singleForm.Controller",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.v1-stt-previsione",
  requires: [
    "stt.view.forms.previsione.Model",
    "stt.view.forms.previsione.cards.Dashboard",
    "stt.view.forms.previsione.cards.dettaglio.GridClienti",
    "stt.view.forms.previsione.cards.dettaglio.GridClienteArticoli",
  ],
  init: function () {
    this.callParent(arguments);
  },
  onAfterRender: function () {
    let me = this;
    me.getView().setActiveItem(me.form);
    me.managerView();
  },

  managerView: function () {
    this.callParent(arguments);

    this.cardDashboard = Ext.create("stt.view.forms.previsione.cards.Dashboard");

    this.form.add(this.cardDashboard);
    this.getView().setActiveItem(this.form);
    this.form.setActiveItem(this.cardDashboard);
  },

  onAfterRenderDashBoard: function () {
    this.gridClienti = Ext.create("stt.view.forms.previsione.cards.dettaglio.GridClienti");
    this.gridClienteArticoli = Ext.create("stt.view.forms.previsione.cards.dettaglio.GridClienteArticoli");

    this.gridClienti.on("itemclick", "onItemClickCliente");
    this.cardDashboard.add([this.gridClienti, this.gridClienteArticoli])

    this.onLoadGiridClienti();
  },

  onLoadGiridClienti: function () {
    let me = this,
      vm = me.getViewModel(),
      start = vm.get('rangeYear0'),
      end = vm.get('rangeYear1'),
      store = vm.getStore('storeClienti');

    store.getProxy().extraParams.start = start
    store.getProxy().extraParams.end = end
    store.load();
  },

  onItemClickCliente: function (obj, record, item, index) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('storeClienteArticoli');

    store.getProxy().extraParams.cd_sogg_fat = record.data.cd_sogg_fat
    store.load();

  },

  loadData: function () {
  },

  reloadGrid: function () {
  },


  onafterrendergrid: function (grid) { },

  onBeforeLoad: function (store, operations, opt) {
    if (store.isLoading()) return false;
  },
});
