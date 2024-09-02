/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.view.grids.schede.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.schede',
    requires:[
        'eve.store.grids.schede.Store'
    ],
    stores: {
        store:{type:'v1-schede',autoLoad:false}
    },
    data: {
        titolo:Locale.t('eve.grids.schede.title')
    }
});