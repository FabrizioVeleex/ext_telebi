/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridClMer.Grid", {
  extend: 'Ext.grid.Panel',
  scrollable: 'y',
  bind: {
    store: '{storeClMer}'
  },
  listeners: {
    afterrender: 'onAfterRenderGridClMer'
  }
  ,
  columns: []
});
