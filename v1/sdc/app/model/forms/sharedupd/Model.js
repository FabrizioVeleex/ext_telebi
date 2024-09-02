Ext.define('sdc.model.forms.sharedupd.Model', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'isnew',type: 'int', defaultValue:0},
        { name: 'id', type: 'string'},
        { name: 'idsoggetto', type: 'string'},
        { name: 'mittente', type: 'string'},
        { name: 'subject',type: 'string'},
        { name: 'mailto'},
        { name: 'mailfrom',type: 'string'},
        { name: 'disabled',type: 'int'},
        { name: 'status',  type: 'int'},
        { name: 'datestop',  type: 'date', dateFormat: 'c'},  //dateformat formato da inviare al backend
        { name: 'datedelete',  type: 'date', dateFormat: 'c'},
        { name: 'firstload', type: 'int', defaultValue: 0 }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/sharedupd/',
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