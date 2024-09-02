/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.archiviateupd.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.archiviateupd',
    requires: [
        'sdc.store.grids.archiviateupd.Store'
    ],
    stores: {
        store:{
            type:'archiviateupd',autoLoad:false,
        }
    },
    data: {
        titolo:Locale.t('sdc.grids.archiviateupd.title'),
    }
});