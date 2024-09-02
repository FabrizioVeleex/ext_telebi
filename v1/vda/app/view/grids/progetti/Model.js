/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.progetti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.incorso',
    requires:[
        'vda.store.grids.progetti.Store'
    ],
    stores: {
        store:{type:'v1-incorso',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vda.grids.incorso.title')
    }
});