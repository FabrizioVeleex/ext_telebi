/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.classi.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.classi',
    requires: [
        'itm.grids.classi.Store'
    ],
    stores: {
        store: { type: 'itm-v1-grids-classi', autoLoad: false }
    },
    data: {
        titolo: Locale.t('itm.grids.classi.title')
    }
});