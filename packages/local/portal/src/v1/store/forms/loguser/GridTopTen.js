Ext.define('portal.v1.store.forms.loguser.GridTopTen', {
    extend: 'Ext.data.Store',
    alias:'store.v1-global-gridtopten',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.loguser.GridTopTen'
    ],
    model:'portal.v1.model.forms.loguser.GridTopTen',
    data:[],
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        url: Backend.REST_API + 'gridtopten/',
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