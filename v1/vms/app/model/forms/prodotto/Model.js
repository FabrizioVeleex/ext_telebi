/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vms.model.forms.prodotto.Model', {
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
        {name:'idtipo',defaultValue:''},
        {name:'idsede',defaultValue:''},
        {name:'reparto',defaultValue:''},
        {name:'servizio',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'descrizione',defaultValue:''},
        {name:'numero',defaultValue:''},
        {name:'costruttore',defaultValue:''},
        {name:'matricola',defaultValue:''},
        {name:'note',defaultValue:''},
        {name:'classe',defaultValue:''},
        {name:'tipo',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/prodotto/',
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