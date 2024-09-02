/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stver.store.forms.filtri.Anno', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stver-filtri-anno',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'stver.model.forms.filtri.Anno'
    ],
    model: 'stver.model.forms.filtri.Anno',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/anno/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
