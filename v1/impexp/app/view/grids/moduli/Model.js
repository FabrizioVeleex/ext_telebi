/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.moduli.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.moduli',
    requires:[
        'impexp.store.grids.moduli.Store'
    ],
    stores: {
        store:{type:'v1-moduli',autoLoad:false}
    },
    data: {
        titolo:Locale.t('impexp.grids.moduli.title')
    }
})