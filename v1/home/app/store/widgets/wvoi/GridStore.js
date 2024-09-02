/**
 * Created by luca on 14/10/16.
 */
Ext.define('home.store.widgets.wvoi.GridStore', {
    extend: 'Ext.data.Store',
    xtype: 'wvoi-grid1',
    requires:[
        'home.model.widgets.wvoi.GridStore'
    ],
    model: 'home.model.widgets.wvoi.GridStore',
    data:[]
});