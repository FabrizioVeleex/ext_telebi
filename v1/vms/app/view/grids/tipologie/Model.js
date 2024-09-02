/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.tipologie.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.tipologie',
    requires:[
        'vms.store.grids.tipologie.Store'
    ],
    stores: {
        store:{type:'v1-tipologie',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vms.grids.tipologie.title')
    }
});