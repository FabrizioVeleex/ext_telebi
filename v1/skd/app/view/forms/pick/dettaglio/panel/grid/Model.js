/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.grid.Model', {
  extend: 'Ext.data.Model',
  requires: [
    'Ext.data.proxy.Memory',
    'Ext.data.reader.Json'
  ],


  fields: [
    { name: 'data_ini_contr_ric', type: 'date', dateFormat: 'Y-m-d H:i' },
  ],
  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
});
