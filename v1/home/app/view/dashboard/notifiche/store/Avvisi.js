/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.notifiche.store.Avvisi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-avvisi',
    requires: [
        'home.view.dashboard.notifiche.model.Avvisi'
    ],
    model: 'home.view.dashboard.notifiche.model.Avvisi',
    data : [],
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        simpleSortMode:true,
        type: 'ajax',
        url: Backend.REST_API + 'grids/ntf/listAvvisiHome/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty:'totalCount'
        }
    }
});
