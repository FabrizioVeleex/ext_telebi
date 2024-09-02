/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.cont.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  requires: ["bofpub.view.grid.cont.Model"],
  model: "bofpub.view.grid.cont.Model",
  alias: "store.v1-bofpub-cont",
  autoLoad: true,
  proxy: {
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "grids/cont/getstore",
  },
});
