/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.StoreDettaglio', {
    extend: 'Ext.data.Store',
    alias:'store.v1-word-residuo-dettaglio',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.word.view.residuo.ModelDettaglio'
    ],
    model: 'home.view.dashboard.widgets.word.view.residuo.ModelDettaglio',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/word/getresiduodettaglio',
        extraParams: {cdcli:'',cdart:''},
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
