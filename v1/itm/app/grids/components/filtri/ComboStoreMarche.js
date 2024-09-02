/**
 * Created by luca on 09/11/2016.
 */
Ext.define('itm.grids.components.filtri.ComboStoreMarche', {
  extend: 'Ext.data.Store',
  alias: 'store.itm.v1-filtri-combomarche',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_marca', type: 'string' },
    { name: 'descr_marca', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    pageParam: false,
    startParam: false,
    limitParam: false,
    url: Backend.REST_API + 'grids/filtri/getmarche/',
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