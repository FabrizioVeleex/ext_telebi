/**
 * Created by luke on 15/05/21.
 */
Ext.define('amm.store.forms.scrivania.ComboWidget', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-combowidget',
    requires: [
        'Ext.data.proxy.Rest',
        'amm.model.forms.scrivania.ComboWidget'
    ],
    model:'amm.model.forms.scrivania.ComboWidget',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/scrivania/combowidget/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});