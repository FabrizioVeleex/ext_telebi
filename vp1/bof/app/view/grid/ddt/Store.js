/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ddt.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  requires: ["bofpub.view.grid.ddt.Model"],
  model: "bofpub.view.grid.ddt.Model",
  alias: "store.v1-bofpub-ddt",
  autoLoad: true,

  proxy: {
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "grids/ddt/getstore",
  },
});
