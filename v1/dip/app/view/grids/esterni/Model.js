Ext.define('dip.view.grids.esterni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.esterni',
    requires:[
        'dip.store.grids.esterni.Store'
    ],
    stores: {
        store:{type:'esterni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('dip.grids.esterni.title')

    }
});