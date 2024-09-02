/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stver.model.forms.target.Model', {
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
        {name:'anno',defaultValue:0},
        {name:'codstab',defaultValue:''},
        {name:'stabilimento',defaultValue:''},
        {name:'trg1',type:'int',defaultValue:0},
        {name:'trg2',type:'int',defaultValue:0},
        {name:'trg3',type:'int',defaultValue:0},
        {name:'trg4',type:'int',defaultValue:0},
        {name:'trg5',type:'int',defaultValue:0},
        {name:'trg6',type:'int',defaultValue:0},
        {name:'trg7',type:'int',defaultValue:0},
        {name:'trg8',type:'int',defaultValue:0},
        {name:'trg9',type:'int',defaultValue:0},
        {name:'trg10',type:'int',defaultValue:0},
        {name:'trg11',type:'int',defaultValue:0},
        {name:'trg12',type:'int',defaultValue:0}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/target/',
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