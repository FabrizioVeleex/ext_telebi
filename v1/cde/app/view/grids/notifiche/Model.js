/**
 * Created by luca on 16/02/2017.
 */
Ext.define('cde.view.grids.notifiche.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-grid-notifiche',
    requires:[
        'cde.view.grids.notifiche.component.Store'
    ],
    stores: {
        store:{type:'v1-notifiche',autoLoad:false}
    },
    data: {
        titolo:Locale.t('cde.grids.notifiche.title')
    }
});