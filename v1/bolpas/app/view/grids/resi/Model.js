/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.resi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.resi',
    requires:[
        'bolpas.store.grids.resi.Store'
    ],
    stores: {
        store:{type:'v1-resi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('bolpas.grids.resi.title')
    }
});