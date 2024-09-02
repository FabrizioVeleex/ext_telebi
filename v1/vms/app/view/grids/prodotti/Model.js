/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.prodotti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.prodotti',
    requires:[
        'vms.store.grids.prodotti.Store'
    ],
    stores: {
        store:{type:'v1-prodotti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vms.grids.prodotti.title')
    }
});