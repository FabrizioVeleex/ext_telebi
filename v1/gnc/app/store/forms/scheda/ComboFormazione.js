/**
 * Created by Fabrizio on 09/12/2016.
 */
Ext.define('gnc.store.forms.scheda.ComboFormazione', {
    extend: 'Ext.data.Store',
    alias:'store.comboformazione',
    requires:[
        'Ext.data.proxy.Rest',
        'gnc.model.forms.scheda.ComboFormazione'
    ],
    model:'gnc.model.forms.scheda.ComboFormazione',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scheda/comboformazione/',
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