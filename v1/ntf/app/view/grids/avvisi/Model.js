/**
 * Created by luca on 07/09/16.
 */
Ext.define('ntf.view.grids.avvisi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.avvisi',
    requires:[
        'ntf.store.grids.avvisi.Store'
    ],
    stores: {
        store:{type:'v1-avvisi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ntf.grids.avvisi.title') //titolo vista
    }
});