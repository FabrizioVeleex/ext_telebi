/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolilength.articoliLengthViewModel', {
  extend: 'portal.v1.view.grids.DefaultModel',
  alias: 'viewmodel.itm-v1-grid-articolilength',
  requires: [
    'itm.grids.articolilength.articoliLengthStore',
  ],
  stores: {
    store: { type: 'itm-v1-store-articolilength', autoLoad: false },
  },
  data: {
    titolo: Locale.t('itm.grids.articolilength.title'),
    filtri: {
      id_clm: [],
      id_fam: [],
      id_gruppi: [],
      id_sottogruppi: [],
      id_marche: []
    }
  }
});