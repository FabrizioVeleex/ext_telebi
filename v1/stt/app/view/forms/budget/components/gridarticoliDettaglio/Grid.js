/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridArticoliDettaglio.Grid", {
  extend: 'Ext.grid.Panel',
  scrollable: 'y',
  bind: {
    store: '{storeArticoliDettaglio}'
  },
  listeners: {
    afterrender: 'onAfterRenderGridArticoliDettaglio',
  }
  ,
  columns: []
});
