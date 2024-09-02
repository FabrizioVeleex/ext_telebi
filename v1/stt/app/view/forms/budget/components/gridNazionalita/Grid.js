/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridNazionalita.Grid", {
  extend: 'Ext.grid.Panel',
  scrollable: 'y',
  bind: {
    store: '{storeNazionalita}'
  },
  listeners: {
    afterrender: 'onAfterRenderGridNazionalita'
  }
  ,
  columns: []
});
