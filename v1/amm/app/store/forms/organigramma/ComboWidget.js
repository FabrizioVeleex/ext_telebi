/**
 * Created by luke on 15/05/21.
 */
Ext.define('amm.store.forms.organigramma.ComboWidget', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-combowidget-cmp',
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
        url: Backend.REST_API + 'forms/organigramma/combowidget/',
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