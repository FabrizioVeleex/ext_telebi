/**
 * Created by luca on 28/07/16.
 */
Ext.define('eve.model.forms.scheda.Model', {
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
        {name:'creationdate',type: 'date', dateFormat: 'c'},
        {name:'idevento',defaultValue:''},
        {name:'numero',defaultValue:''},
        {name:'idautore',defaultValue:''},
        {name:'ragsoc',defaultValue:''},
        {name:'gruppo',defaultValue:''},
        {name:'idsoggetto',defaultValue:''},
        {name:'cdnaz',defaultValue:''},
        {name:'nazione',defaultValue:''},
        {name:'lingua',defaultValue:''},
        {name:'idzona',defaultValue:''},
        {name:'fattgen',defaultValue:''},
        {name:'fattfam',defaultValue:''},
        {name:'ndip',defaultValue:''},
        {name:'distnaz',defaultValue:0},
        {name:'distreg',defaultValue:0},
        {name:'negozio',defaultValue:0},
        {name:'officina',defaultValue:0},
        {name:'web',defaultValue:0},
        {name:'note',defaultValue:''},
        {name:'marca',defaultValue:''},
        {name:'cat01',defaultValue:0},
        {name:'brand01',defaultValue:''},
        {name:'cat02',defaultValue:0},
        {name:'cat03',defaultValue:0},
        {name:'cat04',defaultValue:0},
        {name:'cat11',defaultValue:0},
        {name:'brand11',defaultValue:''},
        {name:'cat12',defaultValue:0},
        {name:'cat13',defaultValue:0},
        {name:'cat14',defaultValue:0},
        {name:'tipo01',defaultValue:0},
        {name:'tipo02',defaultValue:0},
        {name:'tipo03',defaultValue:0},
        {name:'tipdist01',defaultValue:0},
        {name:'tipdist02',defaultValue:0},
        {name:'tipdist03',defaultValue:0},
        {name:'notetodo',defaultValue:''},
        {name:'vende01',defaultValue:0},
        {name:'vende02',defaultValue:0},
        {name:'vende03',defaultValue:0},
        {name:'vende04',defaultValue:0},
        {name:'altro',defaultValue:''},
        {name:'modifica',defaultValue:'S'}
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
});