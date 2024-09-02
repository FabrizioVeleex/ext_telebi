Ext.define('dip.view.grids.parametri.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.parametri',
    requires:[
        'dip.store.grids.parametri.Parametri'
    ],
    stores: {
        store:{
            type:'parametri',autoLoad:false
        }
    },
    data: {
        titolo:Locale.t('dip.grids.parametri.title')

    }
});