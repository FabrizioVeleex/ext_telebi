Ext.define('dip.view.grids.utentistampanti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.utentistampanti',

    requires:[
        'dip.store.grids.utentistampanti.Store'
    ],

    stores: {
        store:{ 
            type:'utentistampanti',autoLoad:false
        }
    },
    data: {
        titolo:Locale.t('dip.grids.utentistampanti.title')
    }
});