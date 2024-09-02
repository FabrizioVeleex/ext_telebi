/**
 * Created by luca on 07/09/16.
 */
Ext.define('cde.view.grids.webprodotti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-webprodotti',
    requires:[
        'cde.view.grids.webprodotti.component.Store'
    ],
    stores: {
        store:{type:'v1-grid-webprodotti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('cde.grids.webprodotti.title') //titolo vista
    }
});