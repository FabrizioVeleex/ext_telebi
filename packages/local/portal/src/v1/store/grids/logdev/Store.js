Ext.define('portal.v1.store.grids.logdev.Store', {
  extend: 'Ext.data.BufferedStore',
  alias: 'store.logdev-v1',
  requires: [
    'Ext.data.proxy.Rest',
    'Ext.data.reader.Json',
    'portal.v1.model.grids.logdev.Logdev'
  ],
  model: 'portal.v1.model.grids.logdev.Logdev',
  pageSize: 200,
  leadingBufferZone: 300,
  autoLoad: false,
  remoteSort: true,
  remoteFilter: true,
  listeners: {
    beforeload: function (store) {
      if (store.isLoading()) return false;
    },
    load: 'onLoadStore'
  },
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'logdev/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});