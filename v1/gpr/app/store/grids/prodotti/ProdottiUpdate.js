/**
 * Created by luca on 15/11/2016.
 */
Ext.define('gpr.store.grids.prodotti.ProdottiUpdate', {
    extend: 'Ext.data.Store',
    alias:'store.v1-prodottiupdate',
    requires: [
        'Ext.data.proxy.Rest',
        'gpr.model.grids.ProdottiUpdate'
    ],
    model: 'gpr.model.grids.ProdottiUpdate',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'grids/prodotti/infoupdate/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});