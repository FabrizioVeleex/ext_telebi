/**
 * Created by luca on 06/09/16.
 */
Ext.define('amm.store.grids.alberomenu.Store', {
    extend: 'Ext.data.TreeStore',
    alias:'store.v1-alberomenu',
    requires:[
        'Ext.data.proxy.Rest',
        'amm.model.grids.Alberomenu'
    ],
    model: 'amm.model.grids.Alberomenu',
    root: {
        id :'root',
        children : []
    },
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'grids/alberomenu/getstore/'
    }
});