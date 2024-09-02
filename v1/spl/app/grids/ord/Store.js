/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.ord.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-ord",
  requires: ["spl.grids.ord.Model"],
  model: "spl.grids.ord.Model",
  proxy: {
    url: Backend.REST_API + "grids/ord/getstore/",
    extraParams: {}
  },
  listeners: {
    load: "onLoadStore",
    beforeload: "onBeforeload"
  }
});
