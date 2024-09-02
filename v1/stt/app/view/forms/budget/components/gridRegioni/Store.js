/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridRegioni.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-analisi-storeregioni",
  requires: ["stt.view.forms.budget.components.gridRegioni.Model"],
  model: "stt.view.forms.budget.components.gridRegioni.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/budget/analisi/regioni/getStore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }

});
