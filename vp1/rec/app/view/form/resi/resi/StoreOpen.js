/**
 * Created by luca on 20/02/2017.
 */
Ext.define('recpub.view.form.resi.resi.StoreOpen', {
    extend: 'Ext.data.Store',
    alias:'store.incorso',
    requires:[
        'Ext.data.proxy.Rest',
        'recpub.view.form.resi.resi.ModelOpen'
    ],
    model: 'recpub.view.form.resi.resi.ModelOpen',
    remoteSort: true,
    remoteFilter: true,
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'grids/resi/getstore',
        extraParams: {stato: 0},
        reader: {type: 'json', rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});