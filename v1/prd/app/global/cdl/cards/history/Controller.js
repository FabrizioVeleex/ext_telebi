Ext.define("prd.global.cdl.cards.history.Controller", {
  history_mc: function () {
    let me = this,
      vm = me.getViewModel();

    this.onLoadHistory();
  },
  onLoadStore: function () {

  },
  onLoadHistory: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record"),
      storeHistory = vm.getStore("storeHistory");

    if (!storeHistory.getProxy().extraParams) storeHistory.getProxy().extraParams = {}
    storeHistory.getProxy().extraParams.id = record.data.id
    storeHistory.load();
  },
  onBeforeLoad: function (store, operations, opt) {
    if (store.isLoading()) return false
  },


})