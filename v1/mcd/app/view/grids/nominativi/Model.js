/**
 * Created by luke on 2019-06-03.
 */
Ext.define('mcd.view.grids.nominativi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.nominativi',
    requires:[
        'mcd.store.grids.nominativi.Store'
    ],
    stores: {
        store:{type:'v1-nominativi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('mcd.grids.nominativi.title')
    }
});