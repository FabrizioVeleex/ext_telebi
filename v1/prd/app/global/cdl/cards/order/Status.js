
Ext.define('prd.global.cdl.cards.order.Status', {
  extend: 'Ext.Container',
  xtype: "global-cdl-cards-order-status",
  flex: 1,
  style: {
    "text-align": "center",
    "font-size": "x-large",
    "vertical-align": "middle",
  },
  bind: {
    html: `<div style="font-style:italic;font-size:small;">${Locale.t('prd.forms.cdl.cards.order.status.avanzamento')}</div>
    <div style="border:1px solid;padding:10px;margin:5px;display:inline-block;">{record.displayStatus}</div>`
  }
})