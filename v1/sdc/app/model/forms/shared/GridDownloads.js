Ext.define('sdc.model.forms.shared.GridDownloads', {
    extend: 'Ext.data.Model',
    alias: 'model.griddownloads',
    fields: [
        {name: 'index', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'idrecord', type: 'string'},
        {name: 'note', type: 'string'},
        {name: 'ipaddress', type: 'string'},
        {name: 'datelog',type: 'date',dateFormat: 'c'}
    ]
})