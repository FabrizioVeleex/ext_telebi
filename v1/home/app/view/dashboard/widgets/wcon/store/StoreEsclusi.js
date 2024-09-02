/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.store.StoreEsclusi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wconesclusi',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wcon.model.GridConfig'
    ],
    model: 'home.view.dashboard.widgets.wcon.model.GridConfig',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/wcon/getstoreesclusi',
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});