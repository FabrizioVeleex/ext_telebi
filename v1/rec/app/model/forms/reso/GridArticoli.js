/**
 * Created by luke on 05/05/21.
 */
Ext.define('rec.model.forms.reso.GridArticoli', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'index', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'idrecord', type: 'string'},
        {name: 'idtestata', type: 'string'},
        {name: 'codcaus', type: 'string'},
        {name: 'causale', type: 'string'},
        {name: 'nrbos', type: 'string'},
        {name: 'dtbos',type: 'date',dateFormat: 'c'},
        {name: 'cdars', type: 'string'},
        {name: 'depar', type: 'string'},
        {name: 'qta', type: 'int'},
        {name: 'pcdos', type: 'string'}
    ]
})