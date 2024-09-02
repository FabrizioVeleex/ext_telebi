/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.verifiche.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.verifiche',
    requires:[
        'fmc.store.grids.verifiche.Store'
    ],
    stores: {
        store:{type:'v1-verifiche',autoLoad:false}
    },
    data: {
        titolo:Locale.t('fmc.grids.verifiche.title')
    }
});