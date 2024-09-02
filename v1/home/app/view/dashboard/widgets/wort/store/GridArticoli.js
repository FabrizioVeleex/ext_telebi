/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.GridArticoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wort-articoli',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wort.model.GridArticoli'
    ],
    autoLoad: false,
    model:'home.view.dashboard.widgets.wort.model.GridArticoli',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wort/getarticoli',
        extraParams: {q:'',famiglia:'',brand:'0'},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
