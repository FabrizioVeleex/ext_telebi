/**
 * Created by fabrizio on 15/08/16.
 */
Ext.define('home.store.notifiche.Azioni', {
    extend: 'Ext.data.Store',
    alias:'store.azioni',
    requires: [
        'home.model.notifiche.Azioni'
    ],
    model: 'home.model.notifiche.Azioni',
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