/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.steps.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.steps',
    requires:[
        'vda.store.grids.steps.Store'
    ],
    stores: {
        store:{type:'v1-steps',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vda.grids.steps.title')
    }
})