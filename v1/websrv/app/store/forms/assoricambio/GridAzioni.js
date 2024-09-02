/**
 * Created by luca on 15/07/2017.
 */
Ext.define('websrv.store.forms.assoricambio.GridAzioni', {
    extend: 'Ext.data.BufferedStore',
    alias:'store.v1-gridazioni',
    requires:[
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'websrv.model.forms.assoricambio.Gridazioni'
    ],
    model: 'websrv.model.forms.assoricambio.Gridazioni',

    pageSize: 200,
    leadingBufferZone: 300,
    remoteSort: true,
    remoteFilter: true,

    listeners: {
        beforeLoad:'onBeforeLoad',
        load:'onLoadStoreAz'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/assoricambio/getazioni/',
        extraParams: {'cdcli':''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});