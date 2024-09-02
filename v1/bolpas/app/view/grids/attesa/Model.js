/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.attesa.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.attesa',
    requires:[
        'bolpas.store.grids.attesa.Store'
    ],
    stores: {
        store:{type:'v1-attesa',autoLoad:false}
    },
    data: {
        titolo:Locale.t('bolpas.grids.attesa.title')
    }
});