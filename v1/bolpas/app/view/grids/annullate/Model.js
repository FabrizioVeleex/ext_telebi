/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.annullate.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.annullate',
    requires:[
        'bolpas.store.grids.annullate.Store'
    ],
    stores: {
        store:{type:'v1-annullate',autoLoad:false}
    },
    data: {
        titolo:Locale.t('bolpas.grids.annullate.title')
    }
});