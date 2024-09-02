/**
 * Created by luca on 07/09/16.
 */
Ext.define('websrv.view.grids.assoricambi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.assoricambi',
    requires:[
        'websrv.store.grids.assoricambi.Store'
    ],
    stores: {
        store:{type:'v1-assoricambi',autoLoad:false}
    },
    data: {
        titolo:Locale.t('websrv.grids.assoricambi.title') //titolo vista
    }
});