/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.grids.listbase.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-cde-listbase',
    requires:[
        'cde.view.grids.listbase.component.Store'
    ],
    stores: {
        store:{type:'v1-cde-listbase',autoLoad:false}
    },
    data: {
        titolo:Locale.t('cde.grids.listbase.title')
    }
});