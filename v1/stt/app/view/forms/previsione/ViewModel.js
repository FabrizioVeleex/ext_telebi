/**
 * Created by fabrizio on 11/07/2022.
 */
Ext.define("stt.view.forms.previsione.ViewModel", {
  extend: "portal.v1.view.forms.singleForm.Model",
  alias: "viewmodel.v1-stt-previsione",
  requires: [
    "stt.view.forms.previsione.store.StoreClienti",
    "stt.view.forms.previsione.store.StoreClienteArticoli"
  ],
  stores: {
    storeClienti: { type: "stt-previsione-storeclienti" }, //store clienti
    storeClienteArticoli: { type: "stt-previsione-storeclientearticoli" }, //store cliente articoli
  },
  data: {
    clMer: '01',
    rangeYear0: 2018,
    rangeYear1: 2022,
  },
});
