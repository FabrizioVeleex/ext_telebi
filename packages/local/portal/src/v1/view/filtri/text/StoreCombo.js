/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('portal.v1.view.filtri.text.StoreCombo', {
  extend: 'Ext.data.Store',
  requires: [
    'Ext.data.proxy.Rest'
  ],
  fields: [
    { name: 'codice', type: 'string' },
    { name: 'descrizione', type: 'string' },
  ],
  data: [],
  proxy: {
    type: 'ajax',
    simpleSortMode: true,
    url: Backend.REST_API + '/null/', //TODO
    reader: { type: 'json', rootProperty: 'data' }
  }
});
