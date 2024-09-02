/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stver.view.grids.targets.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.targets',
    requires:[
        'stver.store.grids.targets.Store'
    ],
    stores: {
        store:{type:'v1-targets',autoLoad:false}
    },
    data: {
        titolo:Locale.t('stver.grids.targets.title')
    }
});