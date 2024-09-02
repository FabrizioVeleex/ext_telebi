/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.watt.store.GridStore', {
    extend: 'Ext.data.Store',
    alias:'store.v1-widgetstorewatt',
    remoteSort:false,
    requires:[
        'home.view.dashboard.widgets.watt.model.GridStore'
    ],
    model: 'home.view.dashboard.widgets.watt.model.GridStore',
    listeners: {
        beforeload: function (store, operation, eOpts) {
            if (store.isLoading()) return false;
        }
    }
});
