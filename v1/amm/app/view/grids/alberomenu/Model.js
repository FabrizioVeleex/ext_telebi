/**
 * Created by luke on 21/07/21.
 */
Ext.define('amm.view.grids.alberomenu.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.alberomenu',
    requires:[
        'amm.store.grids.alberomenu.Store'
    ],
    stores: {
        store:{type:'v1-alberomenu',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.alberomenu.title')
    }
});