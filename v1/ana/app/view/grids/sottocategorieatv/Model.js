/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.sottocategorieatv.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.sottocategorieatv',
    requires:[
        'ana.store.grids.sottocategorieatv.Store'
    ],

    stores: {
        store:{type:'v1-sottocategorieatv',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.sottocategorieatv.title')
    }
});