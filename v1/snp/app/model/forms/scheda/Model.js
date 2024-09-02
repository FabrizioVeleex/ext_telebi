/**
 * Created by luca on 16/07/2018.
 */
Ext.define('snp.model.forms.scheda.Model', {
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
        {name:'numero',defaultValue:''},
        {name:'datadoc',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'idtipologia',defaultValue:''},
        {name:'marca',defaultValue:''},
        {name:'modello',defaultValue:''},
        {name:'codiceoe', defaultValue: '' },
        {name:'prezzooe',type:'float', defaultValue: 0},
        {name:'nporte',type:'int', defaultValue: 0},
        {name:'posizione',type:'int', defaultValue: 0},
        {name:'note', defaultValue: '' },
        {name:'acqportiera',type:'int', defaultValue: 0},
        {name:'acqoe',type:'int', defaultValue: 0},
        {name:'acqfor',type:'int', defaultValue: 0},
        {name:'step',type:'int', defaultValue: 10},
        {name:'stepsospesa',type:'int', defaultValue: 10},
        {name:'idscheda', defaultValue: '' }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scheda/',
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