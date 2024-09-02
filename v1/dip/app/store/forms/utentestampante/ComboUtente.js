Ext.define('dip.store.forms.utentestampante.ComboUtente', {
    extend: 'Ext.data.Store',
    alias:'store.comboutente',
    requires: [
        'dip.model.forms.utentestampante.ComboUtente',
        'Ext.data.proxy.Rest',
    ],
    model:'dip.model.forms.utentestampante.ComboUtente',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        url: Backend.REST_API + '/forms/utentestampante/comboutente/',
        extraParams: {'_fn': 'utentiCombo'},
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