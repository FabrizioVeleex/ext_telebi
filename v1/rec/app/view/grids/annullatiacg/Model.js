/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.annullatiacg.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.annullatiacg',
    requires:[
        'rec.store.grids.annullatiacg.Store'
    ],
    stores: {
        store:{type:'v1-annullatiacg',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.annullatiacg.title') //titolo vista
    }
});