/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.province.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.province',
    requires:[
        'ana.store.grids.province.Province'
    ],
    stores: {
        store:{type:'v1-province',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.province.title')
    }
});