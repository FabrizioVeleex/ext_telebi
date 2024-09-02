/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.previsione.store.StoreClienteArticoli", {
  extend: "Ext.data.Store",
  alias: "store.stt-previsione-storeclientearticoli",
  requires: ["stt.view.forms.previsione.model.ModelClienteArticoli"],
  model: "stt.view.forms.previsione.model.ModelClienteArticoli",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/previsione/clientearticoli/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }

});
