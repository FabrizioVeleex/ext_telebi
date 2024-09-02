/**
 * Created by luke on 08/10/2019.
 */
Ext.define('fmc.model.forms.scheda.Model', {
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
        {name:'idsede',defaultValue:''},
        {name:'nome',defaultValue:''},
        {name:'cognome',defaultValue:''},
        {name:'idmansione',defaultValue:''},
        {name:'matricola',defaultValue:''},
        {name:'datanascita',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'dtass',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'dtcess',type: 'date',dateFormat: 'c',defaultValue: ''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scheda/',
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