/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.uffici.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.uffici',
    requires:[
        'ana.store.grids.uffici.Store'
    ],

    stores: {
        store:{type:'v1-uffici',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.uffici.title')
    }
});