/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.organigrammi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.organigrammi',
    requires:[
        'amm.store.grids.organigrammi.Store'
    ],
    stores: {
        store:{type:'v1-organigrammi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.organigrammi.title')
    }
});