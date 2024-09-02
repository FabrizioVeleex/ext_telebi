/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ntc.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  requires: ["bofpub.view.grid.ntc.Model"],
  model: "bofpub.view.grid.ntc.Model",
  alias: "store.v1-bofpub-ntc",
  autoLoad: true,
  proxy: {
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "grids/ntc/getstore"
  }
});
