/**
 * Created by luke on 15/05/21.
 */
Ext.define('amm.store.forms.organigramma.ComboApps', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-comboapps-cmp',
    requires: [
        'Ext.data.proxy.Rest',
        'amm.model.forms.scrivania.ComboApps'
    ],
    model:'amm.model.forms.scrivania.ComboApps',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/organigramma/comboapps/',
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