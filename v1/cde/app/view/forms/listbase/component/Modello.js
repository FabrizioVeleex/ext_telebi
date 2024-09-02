/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.forms.listbase.component.Modello', {
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
        {name:'dateins',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'datestart',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'dateend',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'cd_art', type: 'string'},
        {name:'descr_art', type: 'string'},
        {name:'cd_gruppo', type: 'string'},
        {name:'cdcom1', type: 'string'},
        {name:'cdcom2', type: 'string'},
        {name:'cdcom3', type: 'string'},
        {name:'prezzo', type: 'float'},
        {name:'valido', type: 'int'},
        {name:'sito', type: 'int'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/listbase/',
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