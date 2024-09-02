/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.store.ComboEsclusi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wconcomboesclusi',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wcon.model.ComboEsclusi'
    ],
    model:'home.view.dashboard.widgets.wcon.model.ComboEsclusi',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wcon/comboesclusi',
        reader: {type: 'json', rootProperty: 'data'}
    }
});
