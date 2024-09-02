/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.store.StoreRiservati', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wconriservati',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wcon.model.GridRiservati'
    ],
    model: 'home.view.dashboard.widgets.wcon.model.GridRiservati',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/wcon/getstoreriservati',
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});