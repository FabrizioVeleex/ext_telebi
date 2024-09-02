
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("bol.grids.bol.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-bol-grids-bol",

  requires: [
    "bol.grids.bol.Store",
    'bol.grids.bol.component.trasp.StoreTrasp'
  ],
  stores: {
    store: { type: "v1-grids-bol", autoLoad: false },
    storeTrasp: { type: "v1-grids-bol-trasp", autoLoad: false }
  },
  data: {
    titolo: Locale.t("bol.grids.documenti.bol.title"), //titolo vista
  },
});
