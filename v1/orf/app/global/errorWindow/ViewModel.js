/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("orf.global.errorwindow.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.orf-v1-global-errorwindow",

  requires: [
    "orf.global.errorwindow.StoreErrors",
  ],
  stores: {
    griderrors: { type: "v1-orf-global-errorwindow-store" },
  },
  data: {

  },
});
