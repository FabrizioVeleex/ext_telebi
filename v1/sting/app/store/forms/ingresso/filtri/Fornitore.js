/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('sting.store.forms.ingresso.filtri.Fornitore', {
    extend: 'Ext.data.Store',
    alias:'store.v1-sting-fornitori',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'sting.model.forms.ingresso.filtri.Fornitore'
    ],
    model: 'sting.model.forms.ingresso.filtri.Fornitore',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/fornitore/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
