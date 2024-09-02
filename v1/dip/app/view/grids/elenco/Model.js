Ext.define('dip.view.grids.elenco.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.elenco',
    requires:[
        'dip.store.grids.elenco.Store'
    ],
    stores: {
        store:{type:'elenco',autoLoad:false}
    },
    data: {
        titolo:Locale.t('dip.grids.elenco.title')

    }
});