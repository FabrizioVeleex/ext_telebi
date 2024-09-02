/**
 * Created by luke on 22/07/2020.
 */
Ext.define('rec.store.forms.bozza.ComboContatto', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combocontatto',

    requires: [
        'Ext.data.proxy.Rest',
        'rec.model.forms.bozza.ComboContatto'
    ],
    model:'rec.model.forms.bozza.ComboContatto',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/bozza/combocontatto/',
        extraParams: {cdcli:''},
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