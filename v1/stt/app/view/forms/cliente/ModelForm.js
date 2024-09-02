/**
 * Created by fabrizio on 09/01/2022.
 */
Ext.define('stt.view.forms.cliente.ModelForm', {
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
        { name: 'cdcli', defaultValue: '' },
        { name: 'ragsoc', defaultValue: '' },
        { name: 'associazione', type: 'auto' }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/cliente/',
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