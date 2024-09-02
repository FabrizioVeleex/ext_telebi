/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('spl.global.filtri.descr_trasp.StoreGrid', {
  extend: 'Ext.data.Store',
  fields: [
    "id",
    { name: 'codice', type: 'string' },
    { name: 'descrizione', type: 'string' },
  ],
  data: [],
  proxy: {
    type: 'memory',
    reader: {
      type: 'json',
    }
  }
});