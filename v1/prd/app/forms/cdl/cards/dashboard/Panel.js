/**
* Created by Fabrizio on 24/02/2024.
 */
Ext.define('prd.forms.cdl.cards.dashboard.Panel', {
  extend: 'prd.global.cdl.cards.dashboard.Panel',
  requires: [
    "prd.global.cdl.cards.dashboard.gridOrder.Grid",
    "prd.global.cdl.cards.dashboard.gridProps.Grid"
  ],

  items: [

  ],
  listeners: {
    afterRender: "onAfterRenderDashboard"
  }
});