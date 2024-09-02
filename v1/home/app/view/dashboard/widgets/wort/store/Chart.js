/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.Chart', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wort-chart',

    requires: [
        'home.view.dashboard.widgets.wort.model.Chart'
    ],
    model: 'home.view.dashboard.widgets.wort.model.Chart',
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    }
});
