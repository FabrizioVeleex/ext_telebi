/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stcom.store.forms.filtri.Classe', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-classe',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'stcom.model.forms.filtri.Classe'
    ],
    model: 'stcom.model.forms.filtri.Classe',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/classe/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
