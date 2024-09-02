/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.domini.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.domini',
    requires:[
        'sdc.store.grids.domini.Store'
    ],
    stores: {
        store:{
            type:'domini',autoLoad:false
        }
    },
    data: {
        titolo:Locale.t('sdc.grids.domini.title') //titolo vista
    }
});