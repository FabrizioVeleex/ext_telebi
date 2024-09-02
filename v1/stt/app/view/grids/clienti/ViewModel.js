/**
 * Created by luca on 16/02/2017.
 */
Ext.define("stt.view.grids.clienti.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.stt-v1-grid-clienti",
  requires: ["stt.view.grids.clienti.Store"],
  stores: {
    store: { type: "v1-grid-store-clienti", autoLoad: false },
  },
  data: {
    titolo: Locale.t("stt.grids.clienti.title"),
  },
});
