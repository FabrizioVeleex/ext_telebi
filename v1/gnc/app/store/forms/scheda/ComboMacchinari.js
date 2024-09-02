/**
 * Created by Fabrizio on 09/12/2016.
 */
Ext.define('gnc.store.forms.scheda.ComboMacchinari', {
    extend: 'Ext.data.Store',
    alias:'store.combomacchinari',
    requires:[
        'Ext.data.proxy.Rest',
        'gnc.model.forms.scheda.ComboMacchinari'
    ],
    model:'gnc.model.forms.scheda.ComboMacchinari',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scheda/combomacchinari/',
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