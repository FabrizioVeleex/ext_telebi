Ext.define('dip.store.grids.utentistampanti.Store', {
    extend: 'Ext.data.Store',
    alias:'store.utentistampanti',
    requires:[
        'dip.model.grids.Utentistampanti',
        'Ext.data.proxy.Rest',
    ],
    model: 'dip.model.grids.Utentistampanti',
    autoLoad:false,
    remoteSort: true,
    remoteFilter: true,
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        },
        load:'onLoadStore'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'grids/utentistampanti/getstore/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});