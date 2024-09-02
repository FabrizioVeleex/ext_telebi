/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridNazioni.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-analisi-storenazioni",
  requires: ["stt.view.forms.budget.components.gridNazioni.Model"],
  model: "stt.view.forms.budget.components.gridNazioni.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/budget/analisi/nazioni/getStore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }

});
