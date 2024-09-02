Ext.define('dip.view.grids.utenti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.dipendenti',

    requires:[
        'dip.store.grids.utenti.Store'
    ],
    stores: {
        store:{type:'utenti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('dip.grids.utenti.title'), //titolo vista

    }
});