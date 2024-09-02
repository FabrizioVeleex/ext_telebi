/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.store.GridResiduo', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-wordresidui',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.word.model.GridResiduo'
    ],
    model:'home.view.dashboard.widgets.word.model.GridResiduo',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/word/getstoreresiduo',
        extraParams: {cdcli:'',colonna:'',linea:'',tipo:'1'},
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
