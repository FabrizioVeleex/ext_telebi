/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.orf.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-orf",
  requires: ["spl.grids.orf.Model"],
  model: "spl.grids.orf.Model",
  proxy: {
    url: Backend.REST_API + "grids/orf/getstore/",
    extraParams: {},
  },
  listeners: {
    load: "onLoadStore",
    beforeload: "onBeforeload"
  }
});
