/**
 * Created by luke on 2018-12-24.
 */
Ext.define('websrv.store.forms.webprodotto.GridAccessi', {
    extend: 'Ext.data.BufferedStore',
    alias:'store.v1-gridaccessi',
    requires:[
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'websrv.model.forms.webprodotto.GridAccessi'
    ],
    model: 'websrv.model.forms.webprodotto.GridAccessi',

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
        url: Backend.REST_API + 'forms/webprodotto/getaccessi/',
        extraParams: {'cdcli':''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});