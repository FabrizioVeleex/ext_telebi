/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.fat.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-grids-fat",

  requires: [
    "spl.grids.fat.Store",
    'spl.global.filtri.combo_fat.StoreCombo',
    'spl.global.filtri.combo_fat.StoreSoggetto'
  ],
  stores: {
    store: { type: "v1-grids-fat", autoLoad: false },
    storeComboFat: { type: "v1-spl-global-filtri-combofat" },
    storeComboCli: { type: "v1-spl-global-filtri-combocli" },
  },
  data: {
    titolo: Locale.t("spl.grids.documenti.fat.title"), //titolo vista
  },
});
