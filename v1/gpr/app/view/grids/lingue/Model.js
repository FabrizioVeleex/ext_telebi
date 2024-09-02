/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.lingue.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.lingue',
    requires:[
        'gpr.store.grids.lingue.Store'
    ],
    stores: {
        store:{type:'v1-lingue',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gpr.grids.lingue.title')
    }
})