/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.utenti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.utenti',
    requires:[
        'amm.store.grids.utenti.Store'
    ],
    stores: {
        store:{type:'v1-utenti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.utenti.title')
    }
});