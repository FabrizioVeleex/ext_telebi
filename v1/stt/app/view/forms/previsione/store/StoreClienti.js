/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.previsione.store.StoreClienti", {
  extend: "Ext.data.Store",
  alias: "store.stt-previsione-storeclienti",
  requires: ["stt.view.forms.previsione.model.ModelClienti"],
  model: "stt.view.forms.previsione.model.ModelClienti",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/previsione/clienti/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }

});
