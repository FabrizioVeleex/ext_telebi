/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.store.GridArticoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-articoli-worf',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.worf.model.GridArticoli'
    ],
    model: 'home.view.dashboard.widgets.worf.model.GridArticoli',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/worf/getarticoli',
        extraParams: {cdfor:'',q:''},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
