/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.posizioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.posizioni',
    requires:[
        'ana.store.grids.posizioni.Store'
    ],

    stores: {
        store:{type:'v1-posizioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.posizioni.title')
    }
});