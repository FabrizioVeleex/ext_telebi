/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.comboFornitori.storefornitori', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-itm-form-articoli-combofornitori',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_for', type: 'string' },
    { name: 'rag_soc', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/articolo/getfornitore/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});