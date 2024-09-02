/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stres.store.forms.filtri.Cliente', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stres-filtri-clienti',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'stres.model.forms.filtri.Cliente'
    ],
    model: 'stres.model.forms.filtri.Cliente',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/cliente/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
