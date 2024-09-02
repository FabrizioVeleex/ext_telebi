/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.attributi.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.attributi',
    requires: [
        'itm.grids.attributi.Store'
    ],
    stores: {
        store: { type: 'itm-v1-grids-attributi', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.attributi.title'),
        saveChanged: false,
        removeAtr: false,
    }
});