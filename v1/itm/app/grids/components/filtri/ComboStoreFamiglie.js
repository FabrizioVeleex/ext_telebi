/**
 * Created by luca on 09/11/2016.
 */
Ext.define('itm.grids.components.filtri.ComboStoreFamiglie', {
  extend: 'Ext.data.Store',
  alias: 'store.itm.v1-filtri-combofamiglie',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_fam', type: 'string' },
    { name: 'descr_fam', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    pageParam: false,
    startParam: false,
    limitParam: false,
    url: Backend.REST_API + 'grids/filtri/getfamiglie/',
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