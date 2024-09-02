Ext.define('nsm.grids.statistiche.ViewModel', {
  extend: 'portal.v1.view.grids.DefaultModel',
  alias: 'viewmodel.statistiche',
  requires: [
    'nsm.grids.statistiche.Store',
  ],
  stores: {
    store: { type: 'v1-grid-statistiche', autoLoad: false },
  },
  data: {
    titolo: Locale.t('nsm.grids.statistiche.title')
  }
});