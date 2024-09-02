/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('bofpub.view.grid.ord.dettaglio.StoreDettaglio', {
    extend: 'Ext.data.Store',
    alias:'store.v1-bof-ord-dettaglio',
    requires:[
        'Ext.data.proxy.Rest',
        'bofpub.view.grid.ord.dettaglio.ModelGrid'
    ],
    model: 'bofpub.view.grid.ord.dettaglio.ModelGrid',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_API + "grids/ord/getdettaglio",
        extraParams: {idtestata:'NaN',so:'',tipo_spool:''},
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
