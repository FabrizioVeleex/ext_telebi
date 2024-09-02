Ext.define('portal.v1.store.forms.loguser.ComboUtente', {
    extend: 'Ext.data.Store',
    alias:'store.v1-global-comboutente',
    requires: [
        'portal.v1.model.forms.loguser.ComboUtente',
        'Ext.data.proxy.Rest',
    ],
    model:'portal.v1.model.forms.loguser.ComboUtente',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        url: Backend.REST_API + 'comboutente/',
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