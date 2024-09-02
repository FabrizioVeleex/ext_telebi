/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.incorso.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.incorso',
    requires:[
        'rec.store.grids.incorso.Store'
    ],
    stores: {
        store:{type:'v1-incorso',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.incorso.title')
    }
});