/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.paesi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.paesi',
    requires:[
        'ana.store.grids.paesi.Store'
    ],
    stores: {
        store:{type:'v1-paesi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.paesi.title')
    }
});