/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.clienti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.clienti',
    requires:[
        'rec.store.grids.clienti.Store'
    ],
    stores: {
        store:{type:'v1-clienti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.clienti.title') //titolo vista
    }
});