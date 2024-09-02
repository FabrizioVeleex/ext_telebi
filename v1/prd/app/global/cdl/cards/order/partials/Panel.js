
Ext.define('prd.global.cdl.cards.order.partials.Panel', {
  extend: 'Ext.form.FieldSet',
  requires: [
    "prd.global.cdl.cards.order.partials.Grid"
  ],
  xtype: "global-cdl-cards-order-partials-panel",
  collapsible: false, collapsed: false,
  title: '<span style="color: black;font-weight:bold">' + Locale.t('prd.forms.cdl.cards.order.partials.title') + '</span>',
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: "global-cdl-cards-order-partials-grid", itemId: "gridPartials", bind: {
        store: '{storePartials}',
      }
    }
  ]
})