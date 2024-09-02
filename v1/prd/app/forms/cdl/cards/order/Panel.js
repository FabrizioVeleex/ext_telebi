/**
* Created by Fabrizio on 10/03/24.
 */
Ext.define('prd.forms.cdl.cards.order.Panel', {
  extend: 'prd.global.cdl.cards.order.Panel',
  requires: [
    'prd.forms.cdl.cards.order.Controller',
    'prd.forms.cdl.cards.order.ViewModel',
    // "prd.global.cdl.cards.order.cronology.Grid",
    // "prd.forms.lantek.cards.order.grid.Grid",
  ],

  controller: 'v1-prd-forms-cdl-order-controller',
  viewModel: 'v1-prd-forms-cdl-order-viewmodel',
  scrollable: 'y',
  margin: 15,
  dockedItems: [

  ],

  listeners: {
    afterRender: "onAfterRender",
    updateData: "onUpdateData"
  }
});