/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.responsabili.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.responsabili',
    requires:[
        'gnc.store.grids.responsabili.Store'
    ],
    stores: {
        store:{type:'v1-responsabili',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gnc.grids.responsabili.title')
    }
});