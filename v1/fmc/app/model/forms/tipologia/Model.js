/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.model.forms.tipologia.Model', {
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
        {name:'descrizione',defaultValue:''},
        {name:'abilitata',defaultValue:1},
        {name:'obbligo',defaultValue:0}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/tipologia/',
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