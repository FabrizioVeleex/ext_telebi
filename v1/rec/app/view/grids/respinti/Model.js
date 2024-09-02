/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.respinti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.respinti',
    requires:[
        'rec.store.grids.respinti.Store'
    ],
    stores: {
        store:{type:'v1-respinti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.respinti.title')
    }
});