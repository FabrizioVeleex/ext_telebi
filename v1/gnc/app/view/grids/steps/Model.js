/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.steps.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.steps',
    requires:[
        'gnc.store.grids.steps.Store'
    ],
    stores: {
        store:{type:'v1-steps',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gnc.grids.steps.title')
    }
})