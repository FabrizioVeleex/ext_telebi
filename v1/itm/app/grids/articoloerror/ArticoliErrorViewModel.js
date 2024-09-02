/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolierror.ArticoliErrorViewModel', {
  extend: 'portal.v1.view.grids.DefaultModel',
  alias: 'viewmodel.itm-v1-grid-articolierror',
  requires: [
    'itm.grids.articolierror.ArticoliErrorStore',
  ],
  stores: {
    store: { type: 'itm-v1-store-articolierror', autoLoad: false },
  },
  data: {
    titolo: Locale.t('itm.grids.articolierror.title'),
    filtri: {
      id_clm: [],
      id_fam: [],
      id_gruppi: [],
      id_sottogruppi: [],
      id_marche: []
    }
  }
});