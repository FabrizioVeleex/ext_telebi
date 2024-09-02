Ext.define('dip.model.forms.filiale.Model', {
    extend: 'Ext.data.Model',
    requires:[
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'id',defaultValue:''},
        {name:'codice',defaultValue:''},
        {name:'numero',defaultValue:''},
        {name:'filiale',defaultValue:''},
        {name:'indirizzo',defaultValue:''},
        {name:'telefono',defaultValue:''},
        {name:'breve',defaultValue:''},
        {name:'fax',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filiale/',
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