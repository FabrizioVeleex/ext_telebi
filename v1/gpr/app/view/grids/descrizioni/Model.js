/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.descrizioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.descrizioni',
    requires:[
        'gpr.store.grids.descrizioni.Store'
    ],
    stores: {
        store:{type:'v1-descrizioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gpr.grids.descrizioni.title')
    }
})