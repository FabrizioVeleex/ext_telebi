/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('stcom.store.forms.articoli.StoreClienti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-stcom-articoli-clienti',
    requires:[
        'Ext.data.proxy.Rest',
        'stcom.model.forms.articoli.ModelClienti'
    ],
    model: 'stcom.model.forms.articoli.ModelClienti',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_API + "grids/articoli/getclienti/",
        extraParams: {cdart:'',cdcli:'',tipocli:'',capoarea:'',nazione:'',regione:'',mese:''},
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
