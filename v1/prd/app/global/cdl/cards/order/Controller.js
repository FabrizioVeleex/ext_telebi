Ext.define("prd.global.cdl.cards.order.Controller", {
  extend: "Ext.app.ViewController",
  requires: [
    "prd.global.cdl.cards.order.Model"
  ],
  init: function () {
    let me = this,
      vm = me.getViewModel(),
      storeOrders = vm.getStore("storeOrders");

    me.valori = me.getView().valori;
    me.globalUrl = me.getView().globalUrl



    this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      items: [{ text: "Chiudi", handler: "onClose" }]
    });
    this.getView().addDocked(this.toolBar, 0);


    storeOrders.loadData(me.valori.record.records)
    me.loadData();

    this.callParent(arguments);
  },
  onAfterRender: function (panel) {
  },
  loadData: function () {
    let me = this,
      vm = me.getViewModel();

    // debugger;
    let model = Ext.create("prd.global.cdl.cards.order.Model", {
      id: me.valori.record.id
    });
    model.load({
      scope: this,
      success: function (record, operation) {
        me.afterLoadModel(record, operation)
        vm.set("record", model);
      }
    });
  },
  onClose: function () {
    this.getView().fireEvent("closePanel", this.valori.record, true);
  },
  onUpdateData: function () {
    this.loadData()
  }
})