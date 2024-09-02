/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.model.forms.progetto.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'step',defaultValue:10}, //10 = valore iniziale step
        {name:'id',type: 'string',defaultValue:''},
        {name:'tipo',type:'int',defaultValue:1},
        {name:'creationdate',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'nome',type: 'string',defaultValue:''},
        {name:'idsoggetto',type: 'string',defaultValue:''},
        {name:'cdcli',type: 'string',defaultValue:''},
        {name:'progassociato',type: 'string',defaultValue:''},
        {name:'applicazione',type: 'string',defaultValue:''},
        {name:'nporte',type: 'string',defaultValue:''},
        {name:'articoli',type: 'string',defaultValue:''},
        {name:'codprod',type: 'string',defaultValue:''},
        {name:'codcomp',type: 'string',defaultValue:''},
        {name:'esponente',type: 'string',defaultValue:''},
        {name:'richiesta',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'dataprogetto',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'dataprototipo',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'dataprod',type: 'date', dateFormat: 'c',defaultValue: ''},
        {name:'destinazione',type: 'string',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/progetto/',
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