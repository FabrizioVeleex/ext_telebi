/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.ComboFamiglie', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wort-combofamiglie',
    requires:[
        'Ext.data.proxy.Rest',
        'home.view.dashboard.widgets.wort.model.ComboFamiglie'
    ],
    model:'home.view.dashboard.widgets.wort.model.ComboFamiglie',
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/wort/getfamiglie',
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});