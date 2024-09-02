/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.attiveupd.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.attiveupd',
    requires: [
        'sdc.store.grids.attiveupd.Store'
    ],
    stores: {
        store:{ //store
            type:'attiveupd',autoLoad:false,
        }
    },
    data: { //titolo vista
        titolo:Locale.t('sdc.grids.attiveupd.title'),
    }
});