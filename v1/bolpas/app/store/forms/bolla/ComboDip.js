/**
 * Created by luke on 22/07/2020.
 */
Ext.define('bolpas.store.forms.bolla.ComboDip', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combodip',

    requires: [
        'Ext.data.proxy.Rest',
        'bolpas.model.forms.bolla.ComboDip'
    ],
    model:'bolpas.model.forms.bolla.ComboDip',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/bolla/combodip/',
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