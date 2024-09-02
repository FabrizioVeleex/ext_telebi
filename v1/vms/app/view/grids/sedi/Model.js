/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.sedi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.sedi',
    requires:[
        'vms.store.grids.sedi.Store'
    ],
    stores: {
        store:{type:'v1-sedi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vms.grids.sedi.title')
    }
});