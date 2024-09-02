/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.modulo.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'action', defaultValue: 0 },//0:none,1:update(new),2:delete
        { name: 'isnew', defaultValue: 0 }, //0 = false, 1 true
        { name: 'id', defaultValue: '' },
        { name: 'codice', defaultValue: '' },
        { name: 'nome', defaultValue: '' },
        { name: 'descrizione', defaultValue: '' }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/modulo/',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
})