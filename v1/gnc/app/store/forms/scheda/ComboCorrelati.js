/**
 * Created by Fabrizio on 09/12/2016.
 */
Ext.define('gnc.store.forms.scheda.ComboCorrelati', {
    extend: 'Ext.data.Store',
    alias:'store.combocorrelati',
    requires:[
        'Ext.data.proxy.Rest',
        'gnc.model.forms.scheda.ComboCorrelati'
    ],
    model:'gnc.model.forms.scheda.ComboCorrelati',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scheda/combocorrelati/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});