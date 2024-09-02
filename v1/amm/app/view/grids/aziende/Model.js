/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.aziende.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.aziende',
    requires:[
        'amm.store.grids.aziende.Store'
    ],
    stores: {
        store:{type:'v1-aziende',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.aziende.title')
    }
});