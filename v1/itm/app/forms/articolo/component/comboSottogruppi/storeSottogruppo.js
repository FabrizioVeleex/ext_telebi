/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.comboSottogruppi.storeSottogruppo', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-itm-form-articoli-combosottogruppo',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_sottogruppo', type: 'string' },
    { name: 'descr_sottogruppo', type: 'string' }
  ],
  data: []
});