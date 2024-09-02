/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.store.GridStore', {
    extend: 'Ext.data.Store',
    alias:'store.v1-store-wcld',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wcld.model.GridStore'
    ],
    model: 'home.view.dashboard.widgets.wcld.model.GridStore',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wcld/getstore',
        extraParams: {testo:'',stato:1,avanzamento:0},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
