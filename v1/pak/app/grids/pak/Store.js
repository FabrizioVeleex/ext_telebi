
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("pak.grids.pak.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-pak",
  requires: ["pak.grids.pak.Model"],
  model: "pak.grids.pak.Model",
  proxy: {
    url: Backend.REST_API + "grids/pak/getstore/",
    extraParams: {},
  },
});
