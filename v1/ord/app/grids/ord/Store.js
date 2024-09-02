/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("ord.grids.ord.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-ord",
  requires: ["ord.grids.ord.Model"],
  model: "ord.grids.ord.Model",
  proxy: {
    url: Backend.REST_API + "grids/ord/getstore/",
    extraParams: { C: false, R: false, P: false, status: "ongoing", value: "[]" },
  },
});
