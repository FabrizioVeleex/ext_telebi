/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.annullati.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-annullati',
    requires:[
        'vda.store.grids.annullati.Store'
    ],
    stores: {
        store:{type:'v1-annullati',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vda.grids.annullati.title')
    }
});