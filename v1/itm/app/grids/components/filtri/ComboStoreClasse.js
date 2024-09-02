/**
 * Created by luca on 09/11/2016.
 */
Ext.define('itm.grids.components.filtri.ComboStoreClasse', {
  extend: 'Ext.data.Store',
  alias: 'store.itm.v1-filtri-comboclasse',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_clm', type: 'string' },
    { name: 'descr_clm', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    pageParam: false,
    startParam: false,
    limitParam: false,
    url: Backend.REST_API + 'grids/filtri/getclassi/',
    appendId: false,
    reader: {
      type: 'json',
      rootProperty: 'data'
    },
    writer: {
      type: 'json',
      writeAllFields: true
    }
  }
});