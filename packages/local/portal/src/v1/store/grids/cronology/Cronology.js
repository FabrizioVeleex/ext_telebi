Ext.define('portal.v1.store.grids.cronology.Cronology', {
    extend: 'Ext.data.BufferedStore',
    alias:'store.cronology-v1',
    requires:[
        'portal.v1.model.grids.cronology.Cronology',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],
    model:'portal.v1.model.grids.cronology.Cronology',
    pageSize: 200,
    leadingBufferZone: 300,
    autoLoad:false,
    remoteSort: true,
    remoteFilter: true,
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        },
        load:'onLoadStore'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'cronology/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});