/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stcom.model.forms.budget.Model', {
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
        {name:'idcli',defaultValue:''},
        {name:'cdcli',defaultValue:''},
        {name:'ragsoc',defaultValue:''},
        {name:'totale',type:'float', defaultValue: 0},
        {name:'bdg01',type:'float', defaultValue: 0},
        {name:'bdg02',type:'float', defaultValue: 0},
        {name:'bdg03',type:'float', defaultValue: 0},
        {name:'bdg04',type:'float', defaultValue: 0},
        {name:'bdg05',type:'float', defaultValue: 0},
        {name:'bdg06',type:'float', defaultValue: 0},
        {name:'bdg07',type:'float', defaultValue: 0},
        {name:'bdg08',type:'float', defaultValue: 0},
        {name:'bdg09',type:'float', defaultValue: 0},
        {name:'bdg10',type:'float', defaultValue: 0},
        {name:'bdg11',type:'float', defaultValue: 0},
        {name:'bdg12',type:'float', defaultValue: 0}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/budget/',
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