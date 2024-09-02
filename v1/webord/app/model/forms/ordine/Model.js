/**
 * Created by luca on 16/07/2018.
 */
Ext.define('webord.model.forms.ordine.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'id',defaultValue:0},
        {name:'id_ordine',defaultValue:0},
        {name:'data_ordine',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'codice_cliente',defaultValue:''},
        {name:'ragsoc',defaultValue:''},
        {name:'email_cliente',defaultValue:''},
        {name:'ordine_gestionale', defaultValue: 0 },
        {name:'stato', defaultValue: 0 },
        {name:'codice_indirizzo',defaultValue:''},
        {name:'ragsoc_spedizione',defaultValue:''},
        {name:'indirizzo_spedizione',defaultValue:''},
        {name:'localita_spedizione',defaultValue:''},
        {name:'cap_spedizione',defaultValue:''},
        {name:'prov_spedizione',defaultValue:''},
        {name:'naz_spedizione',defaultValue:''},
        {name:'tel_spedizione',defaultValue:''},
        {name:'note',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/ordine/',
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