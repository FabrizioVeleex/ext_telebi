/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("t40.grids.panotec.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.v1-grids-panotec",
  requires: ["t40.grids.panotec.Model"],
  model: "t40.grids.panotec.Model",
  proxy: {
    url: Backend.REST_API + "grids/panotec/",
    extraParams: {},
  },
});
