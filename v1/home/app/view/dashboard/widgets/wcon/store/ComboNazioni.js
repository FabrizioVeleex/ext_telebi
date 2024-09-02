/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.store.ComboNazioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wconcombonazioni',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wcon.model.ComboNazioni'
    ],
    model:'home.view.dashboard.widgets.wcon.model.ComboNazioni',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wcon/combonazioni',
        reader: {type: 'json', rootProperty: 'data'}
    }
});