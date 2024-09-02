/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.bozze.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.bozze',
    requires:[
        'rec.store.grids.bozze.Store'
    ],
    stores: {
        store:{type:'v1-bozze',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.bozze.title')
    }
});