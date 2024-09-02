/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.chiuse.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.chiuse',
    requires:[
        'gnc.store.grids.chiuse.Store'
    ],
    stores: {
        store:{type:'v1-chiuse',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gnc.grids.chiuse.title')
    }
});