/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.mansioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.mansioni',
    requires:[
        'fmc.store.grids.mansioni.Store'
    ],
    stores: {
        store:{type:'v1-mansioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('fmc.grids.mansioni.title')
    }
});