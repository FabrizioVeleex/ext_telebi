/**
 * Created by luca on 07/09/16.
 */
Ext.define('websrv.view.grids.webprodotti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.webprodotti',
    requires:[
        'websrv.store.grids.webprodotti.Store'
    ],
    stores: {
        store:{type:'v1-webprodotti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('websrv.grids.webprodotti.title') //titolo vista
    }
});