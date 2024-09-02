/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.comboFamiglie.storeFamiglia', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-itm-form-articoli-combofamiglia',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_fam', type: 'string' },
    { name: 'descr_fam', type: 'string' }
  ],
  data: []
});