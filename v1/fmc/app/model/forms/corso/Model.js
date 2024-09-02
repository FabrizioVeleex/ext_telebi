/**
 * Created by luke on 10/10/2019.
 */
Ext.define('fmc.model.forms.corso.Model', {
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
        {name:'numero',defaultValue:''},
        {name:'durata',defaultValue:''},
        {name:'datac',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'datasca',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'idtipologia',defaultValue:''},
        {name:'docente',defaultValue:''},
        {name:'firma',defaultValue:''},
        {name:'materiale',defaultValue:''},
        {name:'idcheck',defaultValue:''},
        {name:'esito',defaultValue:''},
        {name:'oggetto',defaultValue:''},
        {name:'stato',defaultValue:0},
        {name:'idcorso',defaultValue:''},
        {name:'idsede',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/corso/',
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