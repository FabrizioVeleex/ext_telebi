/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.moduli.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.moduli',
    requires:[
        'amm.store.grids.moduli.Store'
    ],
    stores: {
        store:{type:'v1-moduli',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.moduli.title')
    }
});