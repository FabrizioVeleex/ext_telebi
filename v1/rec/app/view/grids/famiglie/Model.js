/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.famiglie.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.famiglie',
    requires:[
        'rec.store.grids.famiglie.Store'
    ],
    stores: {
        store:{type:'v1-famiglie',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.famiglie.title')
    }
})