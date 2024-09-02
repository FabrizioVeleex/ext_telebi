/**
 * Created by luke on 04/11/2019.
 */
Ext.define('fmc.model.forms.verifica.Model', {
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
        {name:'titolo',defaultValue:''},
        {name:'idcorso',defaultValue:''},
        {name:'idsede',defaultValue:''},
        {name:'datachk',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'note',defaultValue:''},
        {name:'stato',defaultValue:0},
        {name:'esecutore',defaultValue:''},
        {name:'esito',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/verifica/',
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