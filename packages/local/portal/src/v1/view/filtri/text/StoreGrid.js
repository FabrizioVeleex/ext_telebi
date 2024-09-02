/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('portal.v1.view.filtri.text.StoreGrid', {
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