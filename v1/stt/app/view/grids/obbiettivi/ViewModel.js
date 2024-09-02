Ext.define('stt.view.grids.obbiettivi.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-stt-obbiettivi',
    requires: [
        'stt.view.grids.obbiettivi.Store'
    ],
    stores: {
        store: {
            type: 'v1-stt-obbiettivi', autoLoad: false
        }
    },
    data: {
        titolo: Locale.t('stt.grids.obbiettivi.title')
    }
});