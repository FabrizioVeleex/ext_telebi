/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.archiviate.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.archiviate',
    requires: [
        'sdc.store.grids.archiviate.Store'
    ],
    stores: {
        store:{
            type:'archiviate',autoLoad:false,
        }
    },
    data: {
        titolo:Locale.t('sdc.grids.archiviate.title'),
    }
});