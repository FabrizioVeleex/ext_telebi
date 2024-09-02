
/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define("spl.grids.bol.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-spl-grids-bol",
  requires: [
    "spl.grids.bol.Store",
  ],
  stores: {
    store: { type: "v1-grids-bol", autoLoad: false },
  },
  data: {
    filtri: {},
    pattern: "",
    titolo: Locale.t("spl.grids.documenti.bol.title"), //titolo vista
  },
});
