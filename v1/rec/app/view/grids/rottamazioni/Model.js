/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.rottamazioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.rottamazioni',
    requires:[
        'rec.store.grids.rottamazioni.Store'
    ],
    stores: {
        store:{type:'v1-rottamazioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.rottamazioni.title') //titolo vista
    }
});