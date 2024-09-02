/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.model.forms.causale.Model', {
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
        {name:'pscaus',defaultValue:''},
        {name:'psdesc',defaultValue:''},
        {name:'psdesi',defaultValue:''},
        {name:'psdesf',defaultValue:''},
        {name:'psdess',defaultValue:''},
        {name:'giorni',defaultValue:0},
        {name:'sito',defaultValue:0},
        {name:'obbfornitore',defaultValue:1}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/causale/',
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