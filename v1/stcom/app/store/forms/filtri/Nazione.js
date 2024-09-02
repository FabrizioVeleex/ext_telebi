/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stcom.store.forms.filtri.Nazione', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-nazione',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'stcom.model.forms.filtri.Nazione'
    ],
    model: 'stcom.model.forms.filtri.Nazione',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/nazione/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
