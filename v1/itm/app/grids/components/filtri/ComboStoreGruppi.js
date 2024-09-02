/**
 * Created by luca on 09/11/2016.
 */
Ext.define('itm.grids.components.filtri.ComboStoreGruppi', {
  extend: 'Ext.data.Store',
  alias: 'store.itm.v1-filtri-combogruppi',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_gruppo', type: 'string' },
    { name: 'descr_gruppo', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    pageParam: false,
    startParam: false,
    limitParam: false,
    url: Backend.REST_API + 'grids/filtri/getgruppi/',
    extraParams: { filtri: { cd_clm: [], cd_fam: [] } },
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