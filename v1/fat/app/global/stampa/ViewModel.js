/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("fat.global.stampa.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.spl-v1-global-stampa",

  requires: [
    "fat.global.component.combostampante.StoreStampante",
    "fat.global.component.griddocumenti.StoreDocumenti",
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
