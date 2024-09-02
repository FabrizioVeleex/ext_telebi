Ext.define('dip.store.forms.utente.ComboFunzioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-funzionicombo',
    requires:[
        'Ext.data.proxy.Rest',
        'dip.model.forms.utente.ComboFunzioni'
    ],
    model:'dip.model.forms.utente.ComboFunzioni',
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/utente/combofunzione/',
        extraParams: {'iduo':''},
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