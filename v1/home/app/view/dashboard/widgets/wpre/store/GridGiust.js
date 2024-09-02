/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.store.GridGiust', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-wpre-gridgiust',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wpre.model.GridGiust'
    ],
    model:'home.view.dashboard.widgets.wpre.model.GridGiust',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wpre/getgiust',
        reader: {type: 'json', rootProperty: 'data'}
    }
});
