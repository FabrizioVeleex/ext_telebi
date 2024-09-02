/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("bol.global.stampa.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.bol-v1-global-stampa",

  requires: [
    "bol.global.component.combostampante.StoreStampante",
    "bol.global.component.griddocumenti.StoreDocumenti",
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
