/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.scrivanie.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.scrivanie',
    requires:[
        'amm.store.grids.scrivanie.Store'
    ],
    stores: {
        store:{type:'v1-scrivanie',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.scrivanie.title')
    }
});