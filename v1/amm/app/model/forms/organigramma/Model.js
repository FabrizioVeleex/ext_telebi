/**
 * Created by luca on 14/06/2017.
 */
Ext.define('amm.model.forms.organigramma.Model', {
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
        {name:'descrizione',defaultValue:''},
        {name:'fax',defaultValue:''},
        {name:'email',defaultValue:''},
        {name:'idpadre',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/organigramma/',
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