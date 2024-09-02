/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.grids.moduli.Store", {
  extend: "portal.v1.store.grids.Store",
  alias: "store.v1-moduli",
  requires: ["stt.view.grids.moduli.Model"],
  model: "stt.view.grids.moduli.Model",
  data: [],
  proxy: {
    url: Backend.REST_API + "grids/moduli/getstore/",
  },
});
