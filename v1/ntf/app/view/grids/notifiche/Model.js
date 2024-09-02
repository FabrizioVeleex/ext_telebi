/**
 * Created by luca on 13/09/16.
 */
Ext.define('ntf.view.grids.notifiche.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.notifiche',
    requires:[
        'ntf.store.grids.notifiche.Store'
    ],
    stores: {
        store:{type:'v1-notifiche',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ntf.grids.azioni.title') //titolo vista
    }
});