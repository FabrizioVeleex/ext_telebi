/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.codifica.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.codifica',
    requires:[
        'bolpas.store.grids.codifica.Store'
    ],
    stores: {
        store:{type:'v1-codifica',autoLoad:false}
    },
    data: {
        titolo:Locale.t('bolpas.grids.codifica.title')
    }
});