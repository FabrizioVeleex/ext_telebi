/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.distinte.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.distinte',
    requires: [
        'itm.grids.distinte.Store'
    ],
    stores: {
        store: { type: 'itm-v1-grids-distinte', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.distinte.title'),
        saveChanged: false
    }
});