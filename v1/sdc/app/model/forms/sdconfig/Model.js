Ext.define('sdc.model.forms.sdconfig.Model', {
  extend: 'Ext.data.Model',
  requires: [
    'Ext.data.proxy.Rest',
    'Ext.data.reader.Json',
    'Ext.data.writer.Json'
  ],

  fields: [
    { name: 'action', defaultValue: 0 },//0:none,1:update(new),2:delete
    { name: 'isnew', type: 'int', defaultValue: 0 }, //0 = false, 1 true
    { name: 'id', defaultValue: '' },
    { name: 'mailfrom', defaultValue: '' },
    { name: 'labelfrom', defaultValue: '' },
    { name: 'ggscadenza', defaultValue: 0 },
    { name: 'mailto', defaultValue: '' }
  ],
  proxy: {
    type: 'rest',
    url: Backend.REST_API + 'forms/sdconfig/',
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