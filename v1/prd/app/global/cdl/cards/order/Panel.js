/**
* Created by Fabrizio on 10/03/24.
 */
Ext.define('prd.global.cdl.cards.order.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.layout.container.HBox',
    "prd.global.cdl.cards.order.cronology.Grid",
    "prd.global.cdl.cards.order.orders.Grid",

  ],
  scrollable: 'y',
  margin: 15,
  dockedItems: [],
  items: [],
  listeners: {
    afterRender: "onAfterRender",
    updateData: "onUpdateData"
  }
});