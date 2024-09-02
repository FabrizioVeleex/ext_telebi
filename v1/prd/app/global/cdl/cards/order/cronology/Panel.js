
Ext.define('prd.global.cdl.cards.order.cronology.Panel', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-order-cronology-panel",
  requires: [
    "prd.global.cdl.cards.order.cronology.Grid"
  ],
  collapsible: false, collapsed: true, collapsible: true,
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.order.cronology.title')}</span>`,
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: "global-cdl-cards-order-cronology-grid", itemId: "gridCronology", bind: {
        store: '{storeCronology}',
      }
    }
  ]
})