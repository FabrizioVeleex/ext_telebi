
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.bol.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-bol",
  requires: ["spl.grids.bol.Model"],
  model: "spl.grids.bol.Model",
  proxy: {
    url: Backend.REST_API + "grids/bol/getstore/",
    extraParams: {},
  },
  listeners: {
    load: "onLoadStore",
    beforeload: "onBeforeload"
  }
});
