/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.completate.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.completate',
    requires:[
        'bolpas.store.grids.completate.Store'
    ],
    stores: {
        store:{type:'v1-completate',autoLoad:false}
    },
    data: {
        titolo:Locale.t('bolpas.grids.completate.title')
    }
});