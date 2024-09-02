Ext.define('dip.view.grids.exdipendenti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.exdipendenti',
    requires:[
        'dip.store.grids.exdipendenti.Store'
    ],
    stores: {
        store:{
            type:'exdipendenti',autoLoad:false
        }
    },
    data: {
        titolo:Locale.t('dip.grids.exdipendenti.title')

    }
});