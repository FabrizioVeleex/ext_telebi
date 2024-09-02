/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.forms.documento.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'isnew',type: 'boolean', defaultValue:0},
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'idsoggetto', type: 'string',defaultValue:''},
        { name: 'numero', type: 'string',defaultValue:''},
        { name: 'anno', type: 'int' ,defaultValue:0},
        { name: 'datadoc',type: 'date',dateFormat:'c',defaultValue:''},
        { name: 'descrizione', type: 'string',defaultValue:'' },
        { name: 'cdcli',type: 'string',defaultValue:''},
        { name: 'ragsoc',type: 'string',defaultValue:''},
        { name: 'indirizzo',type: 'string',defaultValue:''},
        { name: 'cap',type: 'string',defaultValue:''},
        { name: 'comune',type: 'string',defaultValue:''},
        { name: 'provincia',type: 'string',defaultValue:''},
        { name: 'bodyemail', type:'string',defaultValue:''},
        { name: 'nomefile', type:'string',defaultValue:''},
        { name: 'percorso', type:'string',defaultValue:''},
        { name: 'estensione', type:'string',defaultValue:''},
        { name: 'mailto', type:'string',defaultValue:''},
        { name: 'subject', type:'string',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/documento/',
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