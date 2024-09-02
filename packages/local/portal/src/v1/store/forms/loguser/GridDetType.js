Ext.define('portal.v1.store.forms.loguser.GridDetType', {
    extend: 'Ext.data.Store',
    alias:'store.v1-global-griddettype',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.loguser.GridDetType'
    ],
    model:'portal.v1.model.forms.loguser.GridDetType',
    data:[],
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        url: Backend.REST_API + 'griddettype/',
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