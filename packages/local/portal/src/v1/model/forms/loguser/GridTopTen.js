Ext.define('portal.v1.model.forms.loguser.GridTopTen', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',},
        {name: 'iduser'},
        {name: 'user'},
        {name: 'percentage', defaultValue: ''},
        {name: 'percentageNum', defaultValue: 0},
        {name: 'total', defaultValue: 0}
    ]
});