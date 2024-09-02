Ext.define('dip.view.grids.ruoli.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.ruoli',
    requires:[
        'dip.store.grids.ruoli.Ruoli'
    ],
    stores: {
        store:{
            type:'ruoli',autoLoad:false
        }
    },
    data: {
        titolo:Locale.t('dip.grids.ruoli.title')

    }
});