/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.store.Store', {
    extend: 'Ext.data.Store',
    alias:'store.v1-widgetstorewver',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wver.model.Model'
    ],
    model: 'home.view.dashboard.widgets.wver.model.Model',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wver/getstore',
        extraParams: {q:''},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
