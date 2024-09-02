/**
 * Created by luca on 14/10/16.
 */
Ext.define('home.store.widgets.wvoi.GridUtenti', {
    extend: 'Ext.data.Store',
    alias:'store.wvoiconfig',
    requires:[
        'home.model.widgets.wvoi.GridUtenti'
    ],
    model:'home.model.widgets.wvoi.GridUtenti',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    }
});