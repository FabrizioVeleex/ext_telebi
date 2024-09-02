/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("orf.grids.orf.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-orf",
  requires: ["orf.grids.orf.Model"],
  model: "orf.grids.orf.Model",
  proxy: {
    url: Backend.REST_API + "grids/orf/getstore/",
    extraParams: { C: false, R: false, P: false, status: "ongoing", value: "[]" },
  },
});
