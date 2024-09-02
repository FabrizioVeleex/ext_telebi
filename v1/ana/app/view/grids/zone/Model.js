/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.zone.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.zone',

    requires:[
        'ana.store.grids.zone.Store'
    ],
    stores: {
        store:{type:'v1-zone',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.zone.title')
    }
});