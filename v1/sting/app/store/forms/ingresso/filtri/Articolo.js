/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('sting.store.forms.ingresso.filtri.Articolo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-sting-articoli',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'sting.model.forms.ingresso.filtri.Articolo'
    ],
    model: 'sting.model.forms.ingresso.filtri.Articolo',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/articolo/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
