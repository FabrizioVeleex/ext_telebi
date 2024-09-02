/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.store.GridFatturato', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wordfatturato',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.word.model.GridFatturato'
    ],
    model: 'home.view.dashboard.widgets.word.model.GridFatturato',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/word/getstorefatturato',
        extraParams: {cdcli:'',colonna:'',linea:''},
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
