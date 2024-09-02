/**
 * Created by luca on 16/02/2017.
 */
Ext.define('snp.view.grids.notifiche.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-notifiche',
    requires:[
        'snp.store.grids.notifiche.Store'
    ],
    stores: {
        store:{type:'v1-notifiche',autoLoad:false}
    },
    data: {
        titolo:Locale.t('snp.grids.notifiche.title')
    }
});