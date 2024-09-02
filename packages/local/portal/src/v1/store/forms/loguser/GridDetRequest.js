Ext.define('portal.v1.store.forms.loguser.GridDetRequest', {
    extend: 'Ext.data.BufferedStore',
    alias:'store.v1-global-griddetrequest',
    requires:[
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'portal.v1.model.forms.loguser.GridDetRequest'
    ],
    model:'portal.v1.model.forms.loguser.GridDetRequest',
    pageSize: 200,
    leadingBufferZone: 300,
    autoLoad:false,
    remoteSort: true,
    remoteFilter: true,
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'griddetrequest/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});