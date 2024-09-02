/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.scaduteupd.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.scaduteupd',
    requires: [
        'sdc.store.grids.scaduteupd.Store'
    ],
    stores: {
        store:{
            type:'scaduteupd',autoLoad:false,
        }
    },
    data: {
        titolo:Locale.t('sdc.grids.scaduteupd.title'),
    }
});