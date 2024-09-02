/**
 * Created by luke on 04/10/2019.
 */
Ext.define('itm.forms.attributo.Model', {
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
        { name: 'sequenza', defaultValue: '' },
        { name: 'language', defaultValue: '' },
        { name: 'attributo', defaultValue: '' }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/attributo/',
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