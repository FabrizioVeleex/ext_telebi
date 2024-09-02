/**
 * Created by Fabrizio on 09/12/2016.
 */
Ext.define('gnc.store.forms.scheda.ComboCollaudo', {
    extend: 'Ext.data.Store',
    alias:'store.combocollaudo',
    requires:[
        'Ext.data.proxy.Rest',
        'gnc.model.forms.scheda.ComboCollaudo'
    ],
    model:'gnc.model.forms.scheda.ComboCollaudo',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scheda/combocollaudo/',
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