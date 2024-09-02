/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.grids.listnetto.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-cde-listnetto',
    requires:[
        'cde.view.grids.listnetto.component.Store'
    ],
    stores: {
        store:{type:'v1-cde-listnetto',autoLoad:false}
    },
    data: {
        titolo:Locale.t('cde.grids.listnetto.title')
    }
});