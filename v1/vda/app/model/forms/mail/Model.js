/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.model.forms.mail.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'step',defaultValue:0}, //10 = valore iniziale step
        {name:'id',type: 'string',defaultValue:''},
        {name:'creationdate',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'idrecord',type: 'string',defaultValue:''},
        {name:'mailfrom',type: 'string',defaultValue:''},
        {name:'mailto',type: 'string',defaultValue:''},
        {name:'subject',type: 'string',defaultValue:''},
        {name:'body',type: 'string',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/mail/',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
})