/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("spl.global.stampa.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.spl-v1-global-stampa",

  requires: [
    "spl.global.component.StoreStampante",
    "spl.global.component.griddocumenti.StoreDocumenti",
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
