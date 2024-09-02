/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.orf.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-grids-orf",

  requires: ["spl.grids.orf.Store"],
  stores: {
    store: { type: "v1-grids-orf", autoLoad: false },
  },
  data: {
    titolo: Locale.t("spl.grids.documenti.orf.title"), //titolo vista
  },
});
