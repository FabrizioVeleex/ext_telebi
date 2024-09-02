/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("fat.grids.fat.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-fat",
  requires: ["fat.grids.fat.Model"],
  model: "fat.grids.fat.Model",
  proxy: {
    url: Backend.REST_API + "grids/fat/getstore/",
    extraParams: { codtrasp: "", cdagente: "", IT: false, OTHER: false },
  },
});
