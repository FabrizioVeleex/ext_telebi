/**
 * Created by luke on 07/10/22.
 */
Ext.define('vms.model.forms.intervento.Model', {
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
        {name:'idprodotto',defaultValue:''},
        {name:'numero',defaultValue:''},
        {name:'classe',defaultValue:''},
        {name:'attivita',defaultValue:''},
        {name:'problema',defaultValue:''},
        {name:'datac',type: 'date',dateFormat:'c',defaultValue:''},
        {name:'matricola', defaultValue: '' },
        {name:'numprod', defaultValue: '' },
        {name:'reparto', defaultValue: '' },
        {name:'esecutore', defaultValue: '' },
        {name:'compilatore', defaultValue: '' },
        {name:'stato', defaultValue: 0 },
        {name:'ciclikm', defaultValue: 0 },
        {name:'ciclikmsucc', defaultValue: 0 },
        {name:'esito',defaultValue:''},
        {name:'tipo',defaultValue:''},
        {name:'ubicazione',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/intervento/',
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