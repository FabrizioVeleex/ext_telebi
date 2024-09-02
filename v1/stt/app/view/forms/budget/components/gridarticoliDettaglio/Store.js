/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridArticoliDettaglio.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-analisi-storearticolidettaglio",
  requires: ["stt.view.forms.budget.components.gridArticoliDettaglio.Model"],
  model: "stt.view.forms.budget.components.gridArticoliDettaglio.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/budget/analisi/articoliDettaglio/getStore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});
