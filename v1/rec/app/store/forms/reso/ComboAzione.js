/**
 * Created by luke on 15/05/21.
 */
Ext.define('rec.store.forms.reso.ComboAzione', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-comboazione',
    requires: [
        'Ext.data.proxy.Rest',
        'rec.model.forms.reso.ComboAzione'
    ],
    model:'rec.model.forms.reso.ComboAzione',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/reso/comboazione/',
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