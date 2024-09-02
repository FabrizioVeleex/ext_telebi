/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.funzioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.funzioni',
    requires:[
        'gpr.store.grids.funzioni.Store'
    ],
    stores: {
        store:{type:'v1-funzioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gpr.grids.funzioni.title')
    }
})