Ext.define('portal.v1.model.forms.loguser.Model', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'id'},
        {name:'user'},
        {name: 'fromdate', type: 'date', dateFormat: 'c', defaultValue: ''},
        {name: 'todate', type: 'date', dateFormat: 'c', defaultValue: ''},
    ]
});