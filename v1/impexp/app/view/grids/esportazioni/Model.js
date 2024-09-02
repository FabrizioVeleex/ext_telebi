/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.esportazioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.esportazioni',
    requires:[
        'impexp.store.grids.esportazioni.Store'
    ],
    stores: {
        store:{type:'v1-esportazioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('impexp.grids.esportazioni.title')
    }
})