/**
 * Created by luke on 2018-12-24.
 */
Ext.define('cde.view.forms.webprodotto.component.StoreAccessi', {
    extend: 'Ext.data.BufferedStore',
    alias:'store.v1-form-gridaccessi',
    requires:[
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'cde.view.forms.webprodotto.component.GridAccessi'
    ],
    model: 'cde.view.forms.webprodotto.component.GridAccessi',

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