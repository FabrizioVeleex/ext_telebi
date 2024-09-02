/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.components.gridNazionalita.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-analisi-storenazionalita",
  requires: ["stt.view.forms.budget.components.gridNazionalita.Model"],
  model: "stt.view.forms.budget.components.gridNazionalita.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/budget/analisi/nazionalita/getStore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }

});
