/**
 * Created by luke on 24/06/2020.
 */
Ext.define('sdc.store.forms.shared.ProgettiCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-progetticombo',
    requires:[
        'Ext.data.proxy.Rest',
        'sdc.model.forms.shared.ProgettiCombo'
    ],
    model:'sdc.model.forms.shared.ProgettiCombo',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/shared/comboprogetto/',
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
})