/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.moduliwidget.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.moduliwidget',
    requires:[
        'amm.store.grids.moduliwidget.Store'
    ],
    stores: {
        store:{type:'v1-moduliwidget',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.moduliwidget.title')
    }
});