/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.tipi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.tipi',
    requires:[
        'vms.store.grids.tipi.Store'
    ],
    stores: {
        store:{type:'v1-tipi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vms.grids.tipi.title')
    }
});