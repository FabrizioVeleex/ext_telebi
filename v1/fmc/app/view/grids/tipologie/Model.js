/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.tipologie.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.tipologie',
    requires:[
        'fmc.store.grids.tipologie.Store'
    ],
    stores: {
        store:{type:'v1-tipologie',autoLoad:false}
    },
    data: {
        titolo:Locale.t('fmc.grids.tipologie.title')
    }
});