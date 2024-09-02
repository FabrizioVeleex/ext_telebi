/**
 * Created by fabrizio on 11/07/2022.
 */
Ext.define("stt.view.forms.ritardi.Controller", {
  extend: "portal.v1.view.forms.singleForm.Controller",
  mixins: [
    "portal.v1.global.Util",
    "stt.view.forms.ritardi.controller.controllerDashboard",
    "stt.view.forms.ritardi.controller.controllerDettaglio"
  ],
  alias: "controller.v1-stt-ritardi",
  requires: [
    "stt.view.forms.ritardi.Model",
    "stt.view.forms.ritardi.components.toolbarFilterInMonth.Toolbar",
    "stt.view.forms.ritardi.components.toolbarFilterGridAndamento.Toolbar",
    "stt.view.forms.ritardi.components.toolbarFooter.Toolbar",

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
    let me = this,
      vm = me.getViewModel();

    this.managerViewDashboard();
    this.managerViewDettaglio()


    this.form.on("tabchange", "onTabChange");

    this.getView().setActiveItem(this.form);
    this.form.setActiveItem(this.dettaglio);
    this.loadData();
  },

  loadData: function () {
    let me = this,
      vm = me.getViewModel();
  },

  reloadGrid: function () {
    this.clearListGridInfo();
    this.gridAndamento.getStore().reload();
  },

  onafterrendergrid: function (grid) { },
  onSearchTriggetSearch: function (item) {
    let grid = item.up("grid");
    if (!grid) grid = this.grid;
    let store = grid.getStore();
    let proxy = store.getProxy();
    let value = item.getValue();
    if (value.length < 1) {
      if (item.hasSearch) {
        this.onClearTriggetSearch(item);
      }
      return;
    }
    item.getTrigger("clear").show();
    proxy.extraParams.pattern = value;
    store.load();
    item.hasSearch = true;
  },
  onSpecialkeySearch: function (item, e) {
    if (e.getKey() === e.ENTER) {
      this.onSearchTriggetSearch(item);
    }
  },
  onClearTriggetSearch: function (item) {
    let grid = item.up("grid");
    if (!grid) grid = this.grid;
    let store = grid.getStore();
    let proxy = store.getProxy();
    if (item.hasSearch) {
      item.setValue("");
      proxy.extraParams.pattern = "";
      store.load();
      item.hasSearch = false;
      item.getTrigger("clear").hide();
    }
  },
  onLoadStore: function (store, records, success) {
    this.listRecords = records;
    if (success) {
      let totalCount = this.gridAndamento.down("#totalCount");
      if (totalCount) {
        if (store.totalCount) {
          totalCount.setValue(Locale.t("global.grid.total") + " " + Ext.util.Format.number(store.totalCount, "0,000"));
        } else {
          totalCount.setValue(Locale.t("global.grid.total") + " 0");
        }
      }
    }
  },
  onBeforeLoad: function (store, operations, opt) {
    if (store.isLoading()) return false;
  },
});
