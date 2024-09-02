Ext.define("prd.global.cdl.cards.queue.Controller", {
  queue_mc: function () {
    let me = this,
      vm = me.getViewModel();

    this.onLoadQueue();
  },
  onLoadStore: function () {

  },
  onLoadQueue: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record"),
      storeQueue = vm.getStore("storeQueue");

    if (!storeQueue.getProxy().extraParams) storeQueue.getProxy().extraParams = {}
    storeQueue.getProxy().extraParams.id = record.data.id
    storeQueue.load();
  },


})