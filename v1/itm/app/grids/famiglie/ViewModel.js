/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.famiglie.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.famiglie',
    requires: [
        'itm.grids.famiglie.Store'
    ],
    stores: {
        store: { type: 'itm-v1-grids-famiglie', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.famiglie.title')
    }
});