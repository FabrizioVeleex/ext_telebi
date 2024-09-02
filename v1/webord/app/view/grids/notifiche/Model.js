/**
 * Created by luca on 16/02/2017.
 */
Ext.define('webord.view.grids.notifiche.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-notifiche',
    requires:[
        'webord.store.grids.notifiche.Store'
    ],
    stores: {
        store:{type:'v1-webord-notifiche',autoLoad:false}
    },
    data: {
        titolo:Locale.t('webord.grids.notifiche.title')
    }
});