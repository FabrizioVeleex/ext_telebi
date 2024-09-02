/**
 * Created by Fabrizio on 09/12/2016.
 */
Ext.define('sdc.store.forms.shared.ComboMailto', {
    extend: 'Ext.data.Store',
    alias:'store.combomailto',
    requires:[
        'Ext.data.proxy.Rest',
        'sdc.model.forms.shared.ComboMailto'
    ],
    model:'sdc.model.forms.shared.ComboMailto',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/shared/combomailto/',
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