/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.store.Store', {
    extend: 'Ext.data.Store',
    alias:'store.v1-storewcon',
    remoteSort:false,
    requires:[
        'home.view.dashboard.widgets.wcon.model.Store'
    ],
    model: 'home.view.dashboard.widgets.wcon.model.Store',
    proxy:{
        type:'memory'
    }
})