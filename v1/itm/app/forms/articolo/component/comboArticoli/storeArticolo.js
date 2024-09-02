/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.comboArticoli.storeArticolo', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-itm-form-articoli-comboarticolo',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_art', type: 'string' },
    { name: 'descrizione', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/articolo/getarticolo/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});