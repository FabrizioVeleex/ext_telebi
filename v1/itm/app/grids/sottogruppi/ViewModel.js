/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.sottogruppi.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.sottogruppi',
    requires: [
        'itm.grids.sottogruppi.Store'
    ],
    stores: {
        store: { type: 'itm-v1-grids-sottogruppi', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.sottogruppi.title')
    }
});