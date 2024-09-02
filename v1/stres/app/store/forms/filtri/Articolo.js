/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stres.store.forms.filtri.Articolo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stres-filtri-articoli',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'stres.model.forms.filtri.Articolo'
    ],
    model: 'stres.model.forms.filtri.Articolo',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/articolo/",
        extraParams: {cdcli:''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
