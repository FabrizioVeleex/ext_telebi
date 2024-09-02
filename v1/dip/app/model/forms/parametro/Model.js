Ext.define('dip.model.forms.parametro.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'pswstd',defaultValue:''},
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/parametro/',
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