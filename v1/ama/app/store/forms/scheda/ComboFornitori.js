/**
 * Created by luke on 27/11/22.
 */
Ext.define('ama.store.forms.scheda.ComboFornitori', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combofornitori',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetCompanies'
    ],
    model:'portal.v1.model.forms.combo.GetCompanies',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/scheda/combofornitori/',
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