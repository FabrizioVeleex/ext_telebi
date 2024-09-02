/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridClienti.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-analisi-storeclienti",
  requires: ["stt.view.forms.budget.components.gridClienti.Model"],
  model: "stt.view.forms.budget.components.gridClienti.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/budget/analisi/clienti/getStore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});
