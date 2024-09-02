
Ext.define('prd.global.cdl.cards.order.orders.Panel', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-order-orders-panel",
  collapsible: false, collapsed: false,
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.order.orders.title')}</span>`,
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: "global-cdl-cards-order-orders-grid", itemId: "gridSend", bind: {
        store: '{storeOrders}',
      }
    }
  ]
})