/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.model.forms.progetto.GridMail', {
    extend: 'Ext.data.Model',
    alias: 'model.gridmail',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'idrecord', type: 'string'},
        {name: 'mailfrom', type: 'string'},
        {name: 'mailto', type: 'string'},
        {name: 'subject', type: 'string'},
        {name: 'autore', type: 'string'},
        {name: 'creationdate',type: 'date',dateFormat: 'c'}
    ]
})