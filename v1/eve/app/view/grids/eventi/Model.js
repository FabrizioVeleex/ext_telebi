/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.view.grids.eventi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.eventi',
    requires:[
        'eve.store.grids.eventi.Store'
    ],
    stores: {
        store:{type:'v1-eventi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('eve.grids.eventi.title')
    }
});