/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("pak.global.stampa.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.pak-v1-global-stampa",

  requires: [
    "pak.global.component.combostampante.StoreStampante",
    "pak.global.component.griddocumenti.StoreDocumenti",
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
