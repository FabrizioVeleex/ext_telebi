/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.importazioni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.importazioni',
    requires:[
        'impexp.store.grids.importazioni.Store'
    ],
    stores: {
        store:{type:'v1-importazioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('impexp.grids.importazioni.title')
    }
})