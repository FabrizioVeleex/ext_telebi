/**
 * Created by luca on 17/07/2018.
 */
Ext.define('bolfor.forms.bolla.ModelData', {
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
        {name:'id_ordine',defaultValue:''},
        {name:'id_sogg_fat',defaultValue:''},
        {name:'id_sogg_spe',defaultValue:''},
        {name:'data_doc',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'creationdate',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'idtipologia',defaultValue:''},
        {name:'num_doc',defaultValue:''},
        {name:'note',defaultValue:''},
        {name:'step',defaultValue:5},
        {name:'nomefile',defaultValue:''},
        {name:'percorso',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/bolla/',
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