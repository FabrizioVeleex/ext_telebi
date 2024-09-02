Ext.define('dip.view.grids.sistema.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.sistema',
    requires:[
        'dip.store.grids.sistema.Store'
    ],
    stores: {
        store:{type:'sistema',autoLoad:false}
    },
    data: {
        titolo:Locale.t('dip.grids.sistema.title')

    }
});