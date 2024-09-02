/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('spl.global.filtri.descr_trasp.StoreCombo', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.Rest'
  ],
  fields: [
    // { name: 'codice', type: 'string' },
    { name: 'descr_trasp', type: 'string' },
  ],
  data: [],
  proxy: {
    type: 'ajax',
    simpleSortMode: true,
    url: Backend.REST_API + '/fuctions/getstoredescr_trasp/',
    reader: { type: 'json', rootProperty: 'data' }
  }
});
