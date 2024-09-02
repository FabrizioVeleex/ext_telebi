/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.store.GridStore', {
    extend: 'Ext.data.Store',
    xtype: 'v1-wvoi-grid1',
    requires:[
        'home.view.dashboard.widgets.wvoi.model.GridStore'
    ],
    model: 'home.view.dashboard.widgets.wvoi.model.GridStore',
    data:[]
});
