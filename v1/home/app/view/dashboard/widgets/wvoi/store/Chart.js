/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.store.Chart', {
    extend: 'Ext.data.Store',
    alias:'store.v1-widgetwviolist',
    requires:[
        'home.view.dashboard.widgets.wvoi.model.Chart'
    ],
    model:'home.view.dashboard.widgets.wvoi.model.Chart'
});
