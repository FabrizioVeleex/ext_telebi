/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridClMer.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-analisi-storeclmer",
  requires: ["stt.view.forms.budget.components.gridClMer.Model"],
  model: "stt.view.forms.budget.components.gridClMer.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/budget/analisi/clmer/getStore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }

});
