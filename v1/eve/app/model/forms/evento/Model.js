/**
 * Created by luca on 16/07/2018.
 */
Ext.define('eve.model.forms.evento.Model', {
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
        {name:'luogo',defaultValue:''},
        {name:'note',defaultValue:''},
        {name:'aperto',defaultValue:1},
        {name:'datain',type: 'date', dateFormat: 'c'},
        {name:'datafin',type: 'date', dateFormat: 'c'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/evento/',
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