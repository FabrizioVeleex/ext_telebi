/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ord.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  requires: ["bofpub.view.grid.ord.Model"],
  model: "bofpub.view.grid.ord.Model",
  alias: "store.v1-bofpub-ord",
  proxy: {
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "grids/ord/getstore"
  }
});
