/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.store.GridStore', {
    extend: 'Ext.data.Store',
    alias:'store.v1-widgetstorewpre',
    remoteSort:false,
    requires:[
        'home.view.dashboard.widgets.wpre.model.GridStore'
    ],
    model: 'home.view.dashboard.widgets.wpre.model.GridStore',
    proxy:{
        type:'memory'
    }
});
