/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stcom.store.forms.filtri.Capoarea', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-capoarea',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'stcom.model.forms.filtri.Capoarea'
    ],
    model: 'stcom.model.forms.filtri.Capoarea',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + "grids/filtri/capoarea/",
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
