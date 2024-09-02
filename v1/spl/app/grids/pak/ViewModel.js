
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.pak.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-spl-grids-pak",

  requires: [
    "spl.grids.pak.Store",
  ],
  stores: {
    store: { type: "v1-grids-pak", autoLoad: false },
  },
  data: {
    titolo: Locale.t("spl.grids.documenti.pak.title"), //titolo vista
  },
});
