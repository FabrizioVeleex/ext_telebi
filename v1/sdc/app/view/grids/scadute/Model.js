/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.scadute.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.scadute',
    requires: [
        'sdc.store.grids.scadute.Store'
    ],
    stores: {
        store:{
            type:'scadute',autoLoad:false,
        }
    },
    data: {
        titolo:Locale.t('sdc.grids.scadute.title'),
    }
});