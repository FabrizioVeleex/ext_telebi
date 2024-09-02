/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.pak.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  requires: ["bofpub.view.grid.pak.Model"],
  model: "bofpub.view.grid.pak.Model",
  alias: "store.v1-bofpub-pak",
  autoLoad: true,
  proxy: {
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "grids/pak/getstore",
  },
});
