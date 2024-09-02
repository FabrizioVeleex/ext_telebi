/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.store.SearchCli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wordsearchcli',
    remoteSort:false,
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.word.model.SearchCli'
    ],
    model: 'home.view.dashboard.widgets.word.model.SearchCli',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/word/searchcli',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
