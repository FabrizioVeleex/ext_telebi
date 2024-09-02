Ext.define('dip.view.grids.abilitati.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.abilitati',
    requires:[
        'dip.store.grids.abilitati.Store'
    ],
    stores: {
        store:{type:'abilitati',autoLoad:false}
    },
    data: {
        titolo:Locale.t('dip.grids.abilitati.title')

    }
});