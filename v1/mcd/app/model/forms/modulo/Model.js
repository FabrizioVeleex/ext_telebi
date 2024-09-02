/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.model.forms.modulo.Model', {
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
        {name:'consegna',type: 'date',dateFormat:'Y-m-d',defaultValue:''},
        {name:'dip_id',defaultValue:''},
        {name:'dip_nome',defaultValue:''},
        {name:'idsede',defaultValue:''},
        {name:'idstabilimento',defaultValue:''},
        {name:'sede',defaultValue:''},
        {name:'comboUo',type:'auto'},
        {name:'comboFolder',type:'auto'}
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