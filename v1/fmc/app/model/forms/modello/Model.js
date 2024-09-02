/**
 * Created by luke on 15/11/2019.
 */
Ext.define('fmc.model.forms.modello.Model', {
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
        {name:'durata',defaultValue:''},
        {name:'tipologiadsp',defaultValue:''},
        {name:'idtipologia',defaultValue:''},
        {name:'docente',defaultValue:''},
        {name:'materiale',defaultValue:''},
        {name:'oggetto',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/modello/',
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