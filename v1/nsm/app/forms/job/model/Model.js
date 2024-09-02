Ext.define('nsm.model.forms.job.Model', {
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
        {name:'nome',defaultValue:''},
        {name:'descrizione',defaultValue:''},
        {name:'job',defaultValue:''},
        {name:'filejs',defaultValue:''},
        {name:'enable',defaultValue:0},
        {name:'interval',defaultValue:''},
        {name:'timeout',defaultValue:''},
        {name:'worker',defaultValue:''},
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/job/',
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