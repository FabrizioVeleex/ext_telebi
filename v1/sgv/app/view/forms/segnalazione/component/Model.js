Ext.define('sgv.view.forms.segnalazione.component.Model', {
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
        {name:'idrichiedente',defaultValue:''},
        {name:'datadoc',defaultValue:'',type: 'date',dateFormat: 'c'},
        {name:'filiale',defaultValue:''},
        {name:'descrizione',defaultValue:''},
        {name:'importo',defaultValue:''},
        {name:'conflitto',defaultValue:0},
        {name:'richiedente',defaultValue:''},
        {name:'esito',defaultValue:''},
        {name:'note',defaultValue:''},
        {name:'nominativo',defaultValue:''},
        {name:'violazione',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/segnalazione/',
        extraParams: {_fn: 'data'},
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