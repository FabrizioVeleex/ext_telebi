/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.grids.progetti.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.v1-atp-grid-progetti',
  requires: [
    'atp.grids.progetti.Store'
  ],
  stores: {
    store: { type: 'v1-atp-store-progetti', autoLoad: false },
  },
  data: {
    titolo: Locale.t('atp.grids.projects.title'),
  }
});