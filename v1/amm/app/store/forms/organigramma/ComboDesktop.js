/**
 * Created by luke on 15/05/21.
 */
Ext.define('amm.store.forms.organigramma.ComboDesktop', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-combocausali',
    requires: [
        'Ext.data.proxy.Rest',
        'amm.model.forms.organigramma.ComboDesktop'
    ],
    model:'amm.model.forms.organigramma.ComboDesktop',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/organigramma/combodesktop/',
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