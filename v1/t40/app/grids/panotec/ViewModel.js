/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("t40.grids.panotec.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-grids-panotec",

  requires: [
    "t40.grids.panotec.Store",
  ],
  stores: {
    store: { type: "v1-grids-panotec", autoLoad: false },
  },
  data: {
    titolo: Locale.t("t40.grids.documenti.panotec.title"), //titolo vista
  },
});
