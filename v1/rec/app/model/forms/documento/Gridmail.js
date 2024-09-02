/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.forms.documento.Gridmail', {
    extend: 'Ext.data.Model',
    alias: 'model.gridmail',
    fields: [
        {name: 'index', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'idrecord', type: 'string'},
        {name: 'mailfrom', type: 'string'},
        {name: 'replymail', type: 'string'},
        {name: 'mailto', type: 'string'},
        {name: 'subject', type: 'string'},
        {name: 'body', type: 'string'},
        {name: 'autore', type: 'string'},
        {name: 'letto', type: 'string'},
        {name: 'creationdate',type: 'date',dateFormat: 'c'},
        {name: 'dataletto',type: 'date',dateFormat: 'c'}
    ]
});