/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.gruppi.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.gruppi',
    requires: [
        'itm.store.grids.gruppi.Store'
    ],
    stores: {
        store: { type: 'itm-v1-grids-gruppi', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.gruppi.title')
    }
});