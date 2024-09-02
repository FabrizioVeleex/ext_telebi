/**
 * Created by luca on 14/06/2017.
 */
Ext.define('amm.model.forms.modulo.Model', {
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
        {name:'tagapp',defaultValue:''},
        {name:'titolo',defaultValue:''},
        {name:'tipo',defaultValue:''},
        {name:'descrizione',defaultValue:''},
        {name:'altezza',defaultValue:''},
        {name:'larghezza',defaultValue:''},
        {name:'modulo',defaultValue:''},
        {name:'linkesterno',defaultValue:'C'},
        {name:'ui',defaultValue:''},
        {name:'version',defaultValue:''}
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
});