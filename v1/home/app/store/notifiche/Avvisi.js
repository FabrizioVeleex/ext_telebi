/**
 * Created by fabrizio on 15/08/16.
 */
Ext.define('home.store.notifiche.Avvisi', {
    extend: 'Ext.data.Store',
    alias:'store.avvisi',
    requires: [
        'home.model.notifiche.Avvisi'
    ],
    model: 'home.model.notifiche.Avvisi',
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