
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.pak.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-pak",
  requires: ["spl.grids.pak.Model"],
  model: "spl.grids.pak.Model",
  proxy: {
    url: Backend.REST_API + "grids/pak/getstore/",
    extraParams: {},
  },
  listeners: {
    beforeload: "onBeforeload"
  }
});
