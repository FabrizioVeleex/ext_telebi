Ext.define('dip.view.grids.filiali.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.filiali',
    requires:[
        'dip.store.grids.filiali.Store'
    ],
    stores: {
        store:{
            type:'filiali',autoLoad:false
        }
    },
    data: {
        titolo:Locale.t('dip.grids.filiali.title')
    }
});