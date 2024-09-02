/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Documenti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.Documenti',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'anno', type: 'int'},
        {name: 'numero', type: 'string'},
        {name: 'datadoc',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'dataletto',type: 'date',dateFormat: 'c'},
        {name: 'cdcli', type: 'string'},
        {name: 'ragsoc', type: 'string'},
        {name: 'descrizione', type: 'string'},
        {name: 'nazione', type: 'string'},
        {name: 'paese', type: 'string'}
    ]
});