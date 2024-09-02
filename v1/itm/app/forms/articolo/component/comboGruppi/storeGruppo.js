/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.comboGruppi.storeGruppo', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-itm-form-articoli-combogruppo',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_gruppo', type: 'string' },
    { name: 'descr_gruppo', type: 'string' }
  ],
  data: []
});