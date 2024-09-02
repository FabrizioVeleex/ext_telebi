
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("pak.grids.pak.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-pak-grids-pak",

  requires: [
    "pak.grids.pak.Store",
    'pak.grids.pak.component.trasp.StoreTrasp'
  ],
  stores: {
    store: { type: "v1-grids-pak", autoLoad: false },
    storeTrasp: { type: "v1-grids-pak-trasp", autoLoad: false }
  },
  data: {
    titolo: Locale.t("pak.grids.documenti.pak.title"), //titolo vista
  },
});
