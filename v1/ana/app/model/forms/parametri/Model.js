/**
 * Created by luke on 30/05/2020.
 */
Ext.define('ana.model.forms.parametri.Model', {
  extend: 'Ext.data.Model',

  requires: ['Ext.data.proxy.Rest', 'Ext.data.reader.Json', 'Ext.data.writer.Json'],
  fields: [
    {name: 'id', defaultValue: ''},
    {name: 'ggattivo', defaultValue: 0},
    {name: 'ggattivofor', defaultValue: 0},
    {name: 'commercialeIT', defaultValue: ''},
    {name: 'commercialeEE', defaultValue: ''},
    {name: 'comboGruppo', defaultValue: ''}
  ],
  proxy: {
    type: 'rest',
    url: Backend.REST_API + 'forms/parametri/',
    reader: {
      type: 'json',
      rootProperty: 'data',
    },
    writer: {
      type: 'json',
      writeAllFields: true,
    },
  },
});
