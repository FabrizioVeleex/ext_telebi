/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.view.grids.scadute.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.scadute',
    requires:[
        'ama.store.grids.scadute.Store'
    ],
    stores: {
        store:{type:'v1-scadute',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ama.grids.schede.titlescadute')
    }
});