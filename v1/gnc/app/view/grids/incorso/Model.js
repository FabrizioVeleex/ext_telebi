/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.incorso.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.incorso',
    requires:[
        'gnc.store.grids.incorso.Store'
    ],
    stores: {
        store:{type:'v1-incorso',autoLoad:false}
    },
    data: {
        titolo:Locale.t('gnc.grids.incorso.title')
    }
});