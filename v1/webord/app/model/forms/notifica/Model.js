/**
 * Created by luca on 16/07/2018.
 */
Ext.define('webord.model.forms.notifica.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'id',defaultValue:''},
        {name:'nome',defaultValue:''},
        {name:'codice',defaultValue:''},
        {name:'descrizione',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/notifica/',
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