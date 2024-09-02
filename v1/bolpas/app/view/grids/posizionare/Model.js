/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.posizionare.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.posizionare',
    requires:[
        'bolpas.store.grids.posizionare.Store'
    ],
    stores: {
        store:{type:'v1-posizionare',autoLoad:false}
    },
    data: {
        titolo:Locale.t('bolpas.grids.posizionare.title')
    }
});