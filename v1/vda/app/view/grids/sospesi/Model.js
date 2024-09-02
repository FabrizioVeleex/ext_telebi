/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.sospesi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-sospesi',
    requires:[
        'vda.store.grids.sospesi.Store'
    ],
    stores: {
        store:{type:'v1-sospesi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vda.grids.sospesi.title')
    }
});