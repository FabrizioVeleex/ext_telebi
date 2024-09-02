/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridRegioni.Grid", {
  extend: 'Ext.grid.Panel',
  scrollable: 'y',
  bind: {
    store: '{storeRegioni}'
  },
  listeners: {
    itemdblclick: 'onItemDblClickGridRegioni',
    afterrender: 'onAfterRenderGridRegioni'
  }
  ,
  columns: []
});
