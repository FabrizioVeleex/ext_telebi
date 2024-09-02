/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.store.GridOrdini', {
    extend: 'Ext.data.Store',
    alias:'store.v1-ordini-worf',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.worf.model.GridOrdini'
    ],
    model: 'home.view.dashboard.widgets.worf.model.GridOrdini',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/worf/getordini',
        extraParams: {cdfor:'',q:''},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
