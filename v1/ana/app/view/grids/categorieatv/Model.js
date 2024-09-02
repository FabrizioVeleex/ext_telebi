/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.categorieatv.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.categorieatv',
    requires:[
        'ana.store.grids.categorieatv.Store'
    ],

    stores: {
        store:{type:'v1-categorieatv',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.categorieatv.title')
    }
});