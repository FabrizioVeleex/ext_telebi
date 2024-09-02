/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("orf.global.stampa.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.orf-v1-global-stampa",

  requires: [
    "orf.global.component.combostampante.StoreStampante",
    "orf.global.component.griddocumenti.StoreDocumenti",
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
