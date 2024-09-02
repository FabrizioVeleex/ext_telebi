/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.annullati.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.annullati',
    requires:[
        'rec.store.grids.annullati.Store'
    ],
    stores: {
        store:{type:'v1-annullati',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.annullati.title') //titolo vista
    }
});