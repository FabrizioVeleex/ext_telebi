/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.grids.listsconto.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-cde-listsconto',
    requires:[
        'cde.view.grids.listsconto.component.Store'
    ],
    stores: {
        store:{type:'v1-cde-listsconto',autoLoad:false}
    },
    data: {
        titolo:Locale.t('cde.grids.listsconto.title')
    }
});