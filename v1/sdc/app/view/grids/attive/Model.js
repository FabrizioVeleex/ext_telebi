/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.attive.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attive',
    requires: [
        'sdc.store.grids.attive.Store'
    ],
    stores: {
        store:{ //store
            type:'attive',autoLoad:false,
        }
    },
    data: { //titolo vista
        titolo:Locale.t('sdc.grids.attive.title'),
    }
});