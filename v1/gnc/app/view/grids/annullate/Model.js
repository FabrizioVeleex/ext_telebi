/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.annullate.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.annullate',
    requires:[
        'gnc.store.grids.annullate.Store'
    ],
    stores: {
        store:{type:'v1-annullate',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gnc.grids.annullate.title')
    }
});