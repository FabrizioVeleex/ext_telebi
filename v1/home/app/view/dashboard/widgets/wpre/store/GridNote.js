/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.store.GridNote', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-wpre-gridnote',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wpre.model.GridNote'
    ],
    model:'home.view.dashboard.widgets.wpre.model.GridNote',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wpre/getnote',
        reader: {type: 'json', rootProperty: 'data'}
    }
});
