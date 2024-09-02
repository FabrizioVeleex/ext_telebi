/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.causali.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.causali',
    requires:[
        'rec.store.grids.causali.Store'
    ],
    stores: {
        store:{type:'v1-causali',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.causali.title')
    }
});