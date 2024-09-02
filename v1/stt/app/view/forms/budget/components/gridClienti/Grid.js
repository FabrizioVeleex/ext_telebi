/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridClienti.Grid", {
  extend: 'Ext.grid.Panel',
  scrollable: 'y',
  bind: {
    store: '{storeClienti}'
  },
  listeners: {
    itemdblclick: 'onItemDblClickGridClienti',
    afterrender: 'onAfterRenderGridClienti'
  }
  ,
  columns: []
});
