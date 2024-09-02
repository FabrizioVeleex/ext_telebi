/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolinew.articoliNewViewModel', {
  extend: 'portal.v1.view.grids.DefaultModel',
  alias: 'viewmodel.itm-v1-grid-articolinew',
  requires: [
    'itm.grids.articolinew.articoliNewStore',
  ],
  stores: {
    store: { type: 'itm-v1-store-articolinew', autoLoad: false },
  },
  data: {
    titolo: "Nuovi Articoli",
    filtri: {
      id_clm: [],
      id_fam: [],
      id_gruppi: [],
      id_sottogruppi: [],
      id_marche: []
    }
  }
});