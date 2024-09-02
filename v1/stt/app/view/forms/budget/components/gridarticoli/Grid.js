/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridArticoli.Grid", {
  extend: 'Ext.grid.Panel',
  scrollable: 'y',
  bind: {
    store: '{storeArticoli}'
  },
  viewConfig: {
    listeners: {

    }
  },
  listeners: {
    itemclick: 'onItemClickGridArticoli',
    afterrender: 'onAfterRenderGridArticoli'
  }
  ,
  columns: []
});
