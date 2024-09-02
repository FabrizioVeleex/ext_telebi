/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridArticoli.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-analisi-storearticoli",
  requires: ["stt.view.forms.budget.components.gridArticoli.Model"],
  model: "stt.view.forms.budget.components.gridArticoli.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/budget/analisi/articoli/getStore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});
