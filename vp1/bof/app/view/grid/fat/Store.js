/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.fat.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  requires: ["bofpub.view.grid.fat.Model"],
  model: "bofpub.view.grid.fat.Model",
  alias: "store.v1-bofpub-fat",
  proxy: {
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "grids/fat/getstore",
  }
});
