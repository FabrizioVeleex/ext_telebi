/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.azioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.azioni',
    requires:[
        'rec.store.grids.azioni.Store'
    ],
    stores: {
        store:{type:'v1-azioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.azioni.title')
    }
})