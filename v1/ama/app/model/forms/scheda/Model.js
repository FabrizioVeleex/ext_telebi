/**
 * Created by luca on 16/07/2018.
 */
Ext.define('ama.model.forms.scheda.Model', {
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
        {name:'step',defaultValue:10},
        {name:'richiesta',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'scadenza',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'tipo',defaultValue:0},
        {name:'articolo',defaultValue:''},
        {name:'idfor',defaultValue:''},
        {name:'attivita',defaultValue:''},
        {name:'sez1',defaultValue:0},
        {name:'sez2',defaultValue:0},
        {name:'sez3',defaultValue:0},
        {name:'sez4',defaultValue:0},
        {name:'lunghezza',defaultValue:''},
        {name:'larghezza',defaultValue:''},
        {name:'profondita',defaultValue:''},
        {name:'note1',defaultValue:''},
        {name:'tol1',defaultValue:''},
        {name:'peso',defaultValue:''},
        {name:'note2',defaultValue:''},
        {name:'tol2',defaultValue:''},
        {name:'codacr',defaultValue:''},
        {name:'grafica',defaultValue:''},
        {name:'note3',defaultValue:''},
        {name:'colore',defaultValue:''},
        {name:'note4',defaultValue:''}

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