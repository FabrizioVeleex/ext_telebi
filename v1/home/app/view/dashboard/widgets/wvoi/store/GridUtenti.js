/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.store.GridUtenti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wvoiconfig',
    requires:[
        'home.view.dashboard.widgets.wvoi.model.GridUtenti'
    ],
    model:'home.view.dashboard.widgets.wvoi.model.GridUtenti',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    }
});
