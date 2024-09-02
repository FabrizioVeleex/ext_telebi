/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("ord.global.errorwindow.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.ord-v1-global-errorwindow",

  requires: [
    "ord.global.errorwindow.StoreErrors",
  ],
  stores: {
    griderrors: { type: "v1-ord-global-errorwindow-store" },
  },
  data: {

  },
});
