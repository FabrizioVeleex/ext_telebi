/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.ComboNazioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wort-combonazioni',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wort.model.ComboNazioni'
    ],
    model:'home.view.dashboard.widgets.wort.model.ComboNazioni',
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/wort/getnazioni',
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});