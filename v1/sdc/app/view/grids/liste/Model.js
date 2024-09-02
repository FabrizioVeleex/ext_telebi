/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.liste.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.liste',
    requires: [
        'sdc.store.grids.liste.Store'
    ],
    stores: {
        store:{type:'liste',autoLoad:false}
    },
    data: {
        titolo:Locale.t('sdc.grids.liste.title'),
    }
});