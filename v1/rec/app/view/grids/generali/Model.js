/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.generali.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.generali',
    requires:[
        'rec.store.grids.generali.Store'
    ],
    stores: {
        store:{type:'v1-generali',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.generali.title') //titolo vista
    }
});