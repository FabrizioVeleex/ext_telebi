/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.forms.listsconto.component.Modello', {
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
        {name:'cd_gruppo', type: 'string'},
        {name:'cd_cli', type: 'string'},
        {name:'ragsoc', type: 'string'},
        {name:'sconto1', type: 'float'},
        {name:'sconto2', type: 'float'},
        {name:'valido', type: 'int'},
        {name:'sito', type: 'int'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/listsconto/',
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