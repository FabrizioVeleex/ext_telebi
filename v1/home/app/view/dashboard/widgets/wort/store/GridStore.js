/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.GridStore', {
    extend: 'Ext.data.Store',
    alias:'store.v1-widgetstorewort',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wort.model.GridStore'
    ],
    model: 'home.view.dashboard.widgets.wort.model.GridStore',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wort/getstore',
        extraParams: {q:''},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
