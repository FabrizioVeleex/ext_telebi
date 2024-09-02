/**
 * Created by luke on 24/06/2020.
 */
Ext.define('sdc.store.forms.shared.ListeCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-listecombo',
    requires:[
        'Ext.data.proxy.Rest',
        'sdc.model.forms.shared.ListeCombo'
    ],
    model:'sdc.model.forms.shared.ListeCombo',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/shared/combolista/',
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