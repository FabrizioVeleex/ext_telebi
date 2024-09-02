Ext.define('portal.v1.model.forms.loguser.GridDetType', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',},
        {name: 'user'},
        {name: 'iduser'},
        {name: 'type'},
        {name: 'percentage', defaultValue: ''},
        {name: 'totel', defaultValue: 0}
    ]
});