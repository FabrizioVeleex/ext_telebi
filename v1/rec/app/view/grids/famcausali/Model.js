/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.famcausali.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.famcausali',
    requires:[
        'rec.store.grids.famcausali.Store'
    ],
    stores: {
        store:{type:'v1-famcausali',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.famcausali.title')
    }
});