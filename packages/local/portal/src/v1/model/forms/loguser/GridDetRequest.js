Ext.define('portal.v1.model.forms.loguser.GridDetRequest', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id',},
        { name: 'url'},
        { name:'datelog', type:'date',dateFormat :'Y-m-d H:i:s'}
    ]
});