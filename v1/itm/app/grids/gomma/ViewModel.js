/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.gomma.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.gomma',
    requires: [
        'itm.grids.gomma.Store'
    ],
    stores: {
        store: { type: 'acr_v1-grid-gomma', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.gomma.title')
    }
});