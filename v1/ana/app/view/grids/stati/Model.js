/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.stati.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.stati',
    requires:[
        'ana.store.grids.stati.Store'
    ],
    stores: {
        store:{type:'v1-stati',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.stati.title')
    }
});