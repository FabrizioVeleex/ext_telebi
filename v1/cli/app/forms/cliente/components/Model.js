/**
 * Created by luke on 04/10/2019.
 */
Ext.define('cli.forms.cliente.components.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'action', defaultValue: 0 },//0:none,1:update(new),2:delete
        { name: 'isnew', defaultValue: 0 }, //0 = false, 1 true
        { name: 'imported', defaultValue: 0 }, //0  non importato da gestionale
        {name:'id',type:'string',defaultValue:''},
        {name:'idstato',type:'string',defaultValue:''},
        {name:'estero',type:'int',defaultValue:0},
        {name:'codfis',type:'string',defaultValue:''},
        {name:'ragsoc',type:'string',defaultValue:''},
        {name:'piva',type:'string',defaultValue:''},
        {name:'indirizzo',type:'string',defaultValue:''},
        {name:'comune',type:'string',defaultValue:''},
        {name:'cap',type:'string',defaultValue:''},
        {name:'provincia',type:'string',defaultValue:''},
        {name:'telefono',type:'string',defaultValue:''},
        {name:'cellulare',type:'string',defaultValue:''},
        {name:'fax',type:'string',defaultValue:''},
        {name:'email',type:'string',defaultValue:''},
        {name:'cdcli',type:'string',defaultValue:''},
        {name:'cdfor',type:'string',defaultValue:''},
        {name:'cdnaz',type:'string',defaultValue:''},
        {name:'tel2',type:'string',defaultValue:''},
        {name:'ipphone',type:'string',defaultValue:''},
        {name:'zipcode',type:'string',defaultValue:''},
        {name:'regione',type:'string',defaultValue:''},
        {name:'sitoweb',type:'string',defaultValue:''},
        {name:'note',type:'string',defaultValue:''},
        {name:'idlocalita',type:'string',defaultValue:''},
        {name:'updcaselle',type:'string',defaultValue:'S'},
        {name:'catve',type:'string',defaultValue:''},
        {name:'caufi',type:'string',defaultValue:''},
        {name:'cdage',type:'string',defaultValue:''},
        {name:'cdagep',type:'string',defaultValue:''},
        {name:'idzona',type:'string',defaultValue:''},
        {name:'yclsca',type:'string',defaultValue:''},
        {name:'cdazienda',type:'string',defaultValue:''},
        {name:'tipologia',type:'string',defaultValue:''},
        {name:'ipaccesso',type:'string',defaultValue:''},
        {name:'ipaccessobck',type:'string',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/cliente/',
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