/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.chiusi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-chiusi',
    requires:[
        'vda.store.grids.chiusi.Store'
    ],
    stores: {
        store:{type:'v1-chiusi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vda.grids.chiusi.title')
    }
});