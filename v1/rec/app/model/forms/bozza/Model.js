/**
 * Created by luke on 05/05/21.
 */
Ext.define('rec.model.forms.bozza.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'isnew',type: 'int', defaultValue:0},
        { name: 'id', type: 'string'},
        { name: 'creationdate',type: 'date', dateFormat: 'c',defaultValue: ''},
        { name: 'cdcli',type: 'string'},
        { name: 'ragsoc',type: 'string'},
        { name: 'nominativo',type: 'string'},
        { name: 'user',type: 'string'},
        { name: 'email',type: 'string'},
        { name: 'note',type: 'string'},
        { name: 'notetecnico',type: 'string'},
        { name: 'traspselect',type: 'string'},
        { name: 'traspcli',type: 'string'},
        { name: 'gggaranzia',type: 'int',defaultValue: 0},
        { name: 'condrot',type: 'int',defaultValue: -1},
        { name: 'manuale',type: 'int',defaultValue: 1},
        { name: 'step',type: 'int',defaultValue: 5}, //default bozza
        { name: 'lingua',type: 'string',defaultValue: 'it'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/bozza/',
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