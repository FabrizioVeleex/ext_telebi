/**
 * Created by luca on 16/06/2017.
 */
Ext.define('ana.model.forms.zona.Model', {
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
        {name:'codice',defaultValue:''},
        {name:'descrizione',defaultValue:''},
        {name:'iduser',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/zona/',
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