/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.fat.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-fat",
  requires: ["spl.grids.fat.Model"],
  model: "spl.grids.fat.Model",
  proxy: {
    url: Backend.REST_API + "grids/fat/getstore/",
    extraParams: {},
  },
  listeners: {
    load: "onLoadStore",
    beforeload: "onBeforeload"
  }
});
