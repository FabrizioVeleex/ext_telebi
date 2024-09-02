/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.model.grids.Progetti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.progetti',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'creationdate',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'nome', type: 'string'},
        {name: 'step', type: 'int'},
        {name: 'descit', type: 'string'},
        {name: 'descen', type: 'string'}
    ]
});