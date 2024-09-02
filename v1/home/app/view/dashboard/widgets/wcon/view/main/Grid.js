/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.main.Grid', {
    extend: 'Ext.grid.Panel',
    multiSelect: false,
    requires: [
        'Ext.grid.feature.Summary',
    ],
    features: [{ftype: 'summary', dock: 'bottom'}],
    viewConfig: {
        emptyText: 'Nessun record presente'
    },
    flex: 1
});