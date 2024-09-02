Ext.define("prd.forms.cdl.cards.order.Controller", {
  extend: "prd.global.cdl.cards.order.Controller",
  alias: "controller.v1-prd-forms-cdl-order-controller",
  requires: [
    "prd.global.cdl.cards.order.Model",
    "prd.global.cdl.cards.order.Order",
    "prd.global.cdl.cards.order.Status",
    "prd.global.cdl.cards.order.cronology.Panel",
    "prd.global.cdl.cards.order.orders.Panel",
    "prd.global.cdl.cards.order.partials.Panel",
    "prd.forms.cdl.cards.order.fieldset.order.Haas"

  ],
  onAfterRender: function (panel) {
    let me = this,
      vm = me.getViewModel();

    console.log(panel.config.customPanel);
    if (panel.config.customPanel === "haas") {
      panel.add([
        { xtype: "prd-forms-cdl-cards-order-fieldset-order-haas" },
        { xtype: "global-cdl-cards-order-status" },
        { xtype: "global-cdl-cards-order-partials-panel" },
        { xtype: "global-cdl-cards-order-orders-panel" },
        { xtype: "global-cdl-cards-order-cronology-panel" },
      ])
      return;
    }

    panel.add([
      { xtype: "global-cdl-cards-order-order" },
      { xtype: "global-cdl-cards-order-status" },
      { xtype: "global-cdl-cards-order-orders-panel" },
      { xtype: "global-cdl-cards-order-cronology-panel" },
    ])



  },
  loadData: function () {
    this.callParent(arguments)
  },
  afterLoadModel: function (record, operation) {
    let me = this,
      vm = me.getViewModel();


    me.toolBar.removeAll();
    let listBtn = [{ text: "Chiudi", handler: "onClose", iconCls: "fas fa-window-close bd-color-blue" }, ...record.data.btn]
    me.toolBar.add(listBtn);

    me.getStore("storeCronology").loadData([])
    if (record.data.log && Array.isArray(record.data.log)) {
      me.getStore("storeCronology").loadData(record.data.log)
    }
    me.getStore("storePartials").loadData([])
    if (record.data.partials && Array.isArray(record.data.partials)) {
      me.getStore("storePartials").loadData(record.data.partials)
    }
  },
  s00: function (btn) { this.actionStatus(0, btn.handler); },
  s97: function (btn) { this.actionStatus(97, btn.handler); },
  s20: function (btn) { this.actionStatus(20, btn.handler); },
  actionStatus: function (status, handler) {
    let me = this,
      vm = me.getViewModel();
    Ext.Ajax.request({
      method: "POST",
      jsonData: { record: me.valori.record.id },
      url: Backend.REST_API + "forms/haas/actionStatus/" + handler + "/",
      success: function (res) {
        // me.view.el.unmask();
        let response = Ext.decode(res.responseText);
        me.valori.record.reLoad = true;
        me.loadData();
      },
      failure: function (response) {
        try {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: response.statusText,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });
  }
})