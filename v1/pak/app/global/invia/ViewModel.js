/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("pak.global.invia.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.pak-v1-global-invia",

  requires: [
    "pak.global.component.griddocumenti.StoreDocumenti",
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
