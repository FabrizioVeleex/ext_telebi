/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridNazioni.Grid", {
  extend: 'Ext.grid.Panel',
  scrollable: 'y',
  bind: {
    store: '{storeNazioni}'
  },
  listeners: {
    itemdblclick: 'onItemDblClickGridNazioni',
    afterrender: 'onAfterRenderGridNazioni'
  }
  ,
  columns: []
});
