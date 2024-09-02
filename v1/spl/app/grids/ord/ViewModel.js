/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.ord.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-grids-ord",

  requires: [
    "spl.grids.ord.Store",
    'spl.global.filtri.combo_ord.StoreCombo',
    'spl.global.filtri.combo_ord.StoreSoggetto'
  ],
  stores: {
    store: { type: "v1-grids-ord", autoLoad: false },
  },
  data: {
    titolo: Locale.t("spl.grids.documenti.ord.title"), //titolo vista
    storeComboOrd: { type: "v1-spl-global-filtri-comboord" },
    storeComboCli: { type: "v1-spl-global-filtri-ord-combocli" },

  },
});
