/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.view.grids.chiuse.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.chiuse',
    requires:[
        'ama.store.grids.chiuse.Store'
    ],
    stores: {
        store:{type:'v1-chiuse',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ama.grids.schede.titlechiuse')
    }
});