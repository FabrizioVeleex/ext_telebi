/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.comboClasse.storeClasse', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-itm-form-articoli-comboclasse',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_clm', type: 'string' },
    { name: 'descr_clm', type: 'string' }
  ],
  data: []
});