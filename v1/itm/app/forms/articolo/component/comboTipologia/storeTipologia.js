/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.comboTipologia.storeTipologia', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-itm-form-articoli-combotipologia',
  requires: [
    'Ext.data.proxy.Rest',
  ],
  fields: [
    { name: 'id', type: 'string' },
    { name: 'desc_tipologia', type: 'string' },
  ],
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/articolo/gettipologia/',
    reader: {
      type: 'json',
      rootProperty: 'data',
    }
  }
});