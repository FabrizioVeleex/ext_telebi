/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("ord.global.stampa.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.ord-v1-global-stampa",

  requires: [
    "ord.global.component.combostampante.StoreStampante",
    "ord.global.component.griddocumenti.StoreDocumenti",
  ],
  stores: {
    combostampanti: { type: "v1-global-firma-comboStampanti", autoLoad: true },
    griddocumenti: { type: "v1-global-component-griddocumenti" },
  },
  data: {
    recordsGood: [],
    idstampante: null,
    copie: 1,
    htmlNoSpool: "",
  },
});
