/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.forms.obbiettivo.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'id', defaultValue: '' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/obbiettivo/',
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