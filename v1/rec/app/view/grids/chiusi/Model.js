/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.chiusi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.chiusi',
    requires:[
        'rec.store.grids.chiusi.Store'
    ],
    stores: {
        store:{type:'v1-chiusi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.chiusi.title')
    }
});