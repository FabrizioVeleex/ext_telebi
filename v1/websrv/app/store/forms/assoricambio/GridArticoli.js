/**
 * Created by luca on 27/06/2017.
 */
Ext.define('websrv.store.forms.assoricambio.GridArticoli', {
    extend: 'Ext.data.BufferedStore',
    alias:'store.v1-gridarticoli',
    requires:[
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'websrv.model.forms.assoricambio.Gridarticoli'
    ],
    model: 'websrv.model.forms.assoricambio.Gridarticoli',

    pageSize: 200,
    leadingBufferZone: 300,
    remoteSort: true,
    remoteFilter: true,

    listeners: {
        beforeLoad:'onBeforeLoad',
        load:'onLoadStore'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/assoricambio/getarticoli/',
        extraParams: {'cdcli':''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});