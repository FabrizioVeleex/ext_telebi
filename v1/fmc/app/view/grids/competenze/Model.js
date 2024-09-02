/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.competenze.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.competenze',
    requires:[
        'fmc.store.grids.competenze.Store'
    ],
    stores: {
        store:{type:'v1-competenze',autoLoad:false}
    },
    data: {
        titolo:Locale.t('fmc.grids.competenze.title')
    }
});