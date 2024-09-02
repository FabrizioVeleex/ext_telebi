/**
 * Created by luca on 13/09/2017.
 */
Ext.define('spl.model.Center', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'datadoc', type: 'string' },
    { name: 'mailto', type: 'string' },
    { name: 'numero', type: 'string' },
    { name: 'ragsoc', type: 'string' },
    { name: 'status', type: 'int' },
    { name: 'titolo', type: 'string' },
    { name: 'url', type: 'string' },
    { name: 'inviato', type: 'string' },
    { name: 'anno', type: 'string' },
    { name: 'modulo', type: 'string' },
    { name: 'spool', type: 'string' }
  ],
  proxy: {
    type: 'rest',
    url: Backend.REST_API + "checkToken/",
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