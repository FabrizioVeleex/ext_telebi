/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("fat.grids.fat.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-grids-fat",

  requires: [
    "fat.grids.fat.Store",
    'fat.grids.fat.component.age.StoreAge'
  ],
  stores: {
    store: { type: "v1-grids-fat", autoLoad: false },
    storeAge: { type: "v1-grids-fat-age", autoLoad: false }
  },
  data: {
    titolo: Locale.t("fat.grids.documenti.fat.title"), //titolo vista
  },
});
