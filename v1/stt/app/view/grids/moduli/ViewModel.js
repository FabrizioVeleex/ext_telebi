/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.grids.moduli.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.moduli",
  requires: ["stt.view.grids.moduli.Store"],
  stores: {
    store: { type: "v1-moduli", autoLoad: false },
  },
  data: {
    titolo: Locale.t("stt.grids.moduli.title"),
  },
});
