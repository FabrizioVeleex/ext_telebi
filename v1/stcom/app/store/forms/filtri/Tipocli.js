/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stcom.store.forms.filtri.Tipocli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-tipocli',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'stcom.model.forms.filtri.Tipocli'
    ],
    model: 'stcom.model.forms.filtri.Tipocli',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/tipocli/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
