/**
 * Created by luke on 27/11/22.
 */
Ext.define('ama.store.forms.scheda.ComboUtenti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-comboutenti',
    requires:[
        'Ext.data.proxy.Rest',
        'ama.model.forms.scheda.comboUtenti'
    ],
    model:'ama.model.forms.scheda.comboUtenti',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/scheda/comboutenti/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    listeners: {
        beforeLoad:'onBeforeLoadUtenti'
    }
});