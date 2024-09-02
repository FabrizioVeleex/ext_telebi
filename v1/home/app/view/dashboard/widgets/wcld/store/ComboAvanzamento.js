/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.store.ComboAvanzamento', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wcld-avanzamento',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wcld.model.ComboAvanzamento'
    ],
    model:'home.view.dashboard.widgets.wcld.model.ComboAvanzamento',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wcld/comboavanzamento',
        reader: {type: 'json', rootProperty: 'data'}
    }
});