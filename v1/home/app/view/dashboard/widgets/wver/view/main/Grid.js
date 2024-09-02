/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.view.main.Grid', {
    extend: 'Ext.grid.Panel',
    multiSelect: false,
    requires: [
        'Ext.grid.feature.Summary'
    ],
    viewConfig: {
        emptyText: Locale.t('global.grid.store.empty')
    },
    features: [{ftype: 'summary', dock: 'bottom'}],
    flex: 1
});
