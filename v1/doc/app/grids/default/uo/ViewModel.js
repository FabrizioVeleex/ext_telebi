/**
 * Created by luca on 16/02/2017.
 */
Ext.define('doc.view.grids.default.uo.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.classi',
    requires: [
        'doc.view.grids.default.uo.Store'
    ],
    stores: {
        store: { type: 'v1-grid-uo', autoLoad: false }
    },
    data: {
        titolo: Locale.t('doc.grids.uo.title')
    }
});