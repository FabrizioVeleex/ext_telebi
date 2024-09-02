/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolimedia.ArticoliViewModel', {
  extend: 'portal.v1.view.grids.DefaultModel',
  alias: 'viewmodel.itm-v1-grid-articolimedia',
  requires: [
    'itm.grids.articolimedia.ArticoliStore',
  ],
  stores: {
    store: { type: 'itm-v1-store-articolimedia', autoLoad: false },
  },
  data: {
    textBtnImageShow: '',
    titolo: Locale.t('itm.grids.articoli_media.title'),
    filtri: {
      id_clm: [],
      id_fam: [],
      id_gruppi: [],
      id_sottogruppi: [],
      id_marche: []
    }
  }
});