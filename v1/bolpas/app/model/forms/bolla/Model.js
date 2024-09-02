/**
 * Created by luke on 15/06/21.
 */
Ext.define('bolpas.model.forms.bolla.Model', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name: 'isnew',type: 'boolean', defaultValue:0},
        {name: 'id', type: 'string',defaultValue:''},
        {name:'iddocumento',defaultValue:''},
        {name:'idsoggetto',defaultValue:''},
        {name:'numero',defaultValue:''},
        {name:'datadoc',type: 'date', dateFormat: 'c',defaultValue:''},
        {name:'note',defaultValue:''},
        {name:'notemag',defaultValue:''},
        {name:'descrizione',defaultValue:''},
        {name:'tipo',defaultValue:0},
        {name:'stato',defaultValue:0},
        {name:'numreg',defaultValue:''},
        {name:'datareg',type: 'date', dateFormat: 'c',defaultValue:''},
        {name:'datacodifica',type: 'date', dateFormat: 'c',defaultValue:''},
        {name:'datainoltro',type: 'date', dateFormat: 'c',defaultValue:''},
        {name:'dataclose',type: 'date', dateFormat: 'c',defaultValue:''},
        {name:'spool',defaultValue:''},
        {name:'scaricatoda',defaultValue:''},
        {name:'storeDip', type: 'auto'},
        {name:'storeSoggetti', type: 'auto'}
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