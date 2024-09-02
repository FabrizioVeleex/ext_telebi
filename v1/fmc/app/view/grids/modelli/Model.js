/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.modelli.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.modelli',
    requires:[
        'fmc.store.grids.modelli.Store'
    ],
    stores: {
        store:{type:'v1-modelli',autoLoad:false}
    },
    data: {
        titolo:Locale.t('fmc.grids.modelli.title')
    }
});