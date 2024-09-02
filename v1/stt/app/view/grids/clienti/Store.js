/**
 * Created by luke on 12/05/22.
 */
Ext.define("stt.view.grids.clienti.Store", {
  extend: "portal.v1.store.grids.Store",
  alias: "store.v1-grid-store-clienti",
  requires: ["stt.view.grids.clienti.Model"],
  model: "stt.view.grids.clienti.Model",
  proxy: {
    url: Backend.REST_API + "grids/clienti/getstore/",
  },
});
