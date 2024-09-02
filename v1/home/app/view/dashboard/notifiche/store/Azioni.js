/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.notifiche.store.Azioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-azioni',
    requires: [
        'home.view.dashboard.notifiche.model.Azioni'
    ],
    model: 'home.view.dashboard.notifiche.model.Azioni',
    data : [],
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        simpleSortMode:true,
        type: 'ajax',
        url: Backend.REST_API + 'grids/ntf/listAzioniHome/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty:'totalCount'
        }
    }
});
