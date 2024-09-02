/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.kit.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.kit',
    requires: [
        'itm.grids.kit.Store'
    ],
    stores: {
        store: { type: 'v1-grid-kit', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.kit.title')
    }
});