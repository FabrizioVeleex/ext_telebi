/**
 * Created by luca on 17/07/2018.
 */
Ext.define('bolfor.forms.bolla.storeform.StoreOrdine', {
    extend: 'Ext.data.Store',
    alias:'store.v1-bolfor-storeordine',
    requires:[
        'Ext.data.proxy.Rest',
        'bolfor.forms.bolla.modelform.ModelOrdine'
    ],
    model:'bolfor.forms.bolla.modelform.ModelOrdine',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/bolla/comboordine/',
        extraParams: {'idfornitore':'#nd#','step':10},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    listeners:{
        beforeload: 'onBeforeLoad'
    }
});