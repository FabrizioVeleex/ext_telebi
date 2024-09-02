/**
 * Created by fabrizio on 10/02/2022.
 */
Ext.define("orf.global.errorwindow.StoreErrors", {
  extend: "Ext.data.Store",
  alias: "store.v1-orf-global-errorwindow-store",
  fields: [
    { name: "errorDest", type: "auto" },
  ],
  data: []
});
