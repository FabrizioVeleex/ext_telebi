/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("orf.global.invia.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.orf-v1-global-invia",

  requires: [
    "orf.global.component.griddocumenti.StoreDocumenti",
  ],
  stores: {
    griddocumenti: { type: "v1-global-component-griddocumenti" },
  },
  data: {
    recordsGood: [],
    idstampante: null,
    copie: 1,
    htmlNoSpool: "",
    htmlNumeroDest: "",
  },
});
