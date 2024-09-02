/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.store.ComboRegioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wconcomboregioni',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wcon.model.ComboRegioni'
    ],
    model:'home.view.dashboard.widgets.wcon.model.ComboRegioni',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wcon/comboregioni',
        reader: {type: 'json', rootProperty: 'data'}
    }
});