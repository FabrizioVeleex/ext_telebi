/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.ComboRegioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wort-comboregioni',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wort.model.ComboRegioni'
    ],
    model:'home.view.dashboard.widgets.wort.model.ComboRegioni',
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/wort/getregioni',
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});