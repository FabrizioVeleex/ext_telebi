/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.gestionale.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.gestionale',
    requires:[
        'bolpas.store.grids.gestionale.Store'
    ],
    stores: {
        store:{type:'v1-gestionale',autoLoad:false}
    },
    data: {
        titolo:Locale.t('bolpas.grids.gestionale.title')
    }
});