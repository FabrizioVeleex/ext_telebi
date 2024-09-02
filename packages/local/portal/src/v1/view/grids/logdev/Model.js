Ext.define('portal.v1.view.grids.logdev.Model', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.logdev-v1',
  requires: [
    'portal.v1.store.grids.logdev.Store'
  ],
  stores: {
    store: {
      type: 'logdev-v1', autoLoad: false
    }
  },
  data: {
    title: null,
    hideTitle: true
  }
});
