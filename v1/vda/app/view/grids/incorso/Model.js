/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.incorso.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-incorso',
    requires:[
        'vda.store.grids.incorso.Store'
    ],
    stores: {
        store:{type:'v1-incorso',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vda.grids.incorso.title')
    }
});