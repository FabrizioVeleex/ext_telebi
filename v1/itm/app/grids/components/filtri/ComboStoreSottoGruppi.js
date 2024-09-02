/**
 * Created by luca on 09/11/2016.
 */
Ext.define('itm.grids.components.filtri.ComboStoreSottoGruppi', {
  extend: 'Ext.data.Store',
  alias: 'store.itm.v1-filtri-combosottogruppi',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_sottogruppo', type: 'string' },
    { name: 'descr_sottogruppo', type: 'string' }

  ],
  proxy: {
    type: 'rest',
    pageParam: false,
    startParam: false,
    limitParam: false,
    url: Backend.REST_API + 'grids/filtri/getsottogruppi/',
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