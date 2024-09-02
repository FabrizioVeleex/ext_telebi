/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.store.GridFatturatoAnno', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wordfatturatoanno',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.word.model.GridFatturatoAnno'
    ],
    model: 'home.view.dashboard.widgets.word.model.GridFatturatoAnno',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/word/getstorefatturatoanno',
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
