/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Resi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.Resi',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'datadoc',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'cdcli', type: 'string'},
        {name: 'ragsoc', type: 'string'},
        {name: 'step', type: 'int'},
        {name: 'tipo', type: 'string'},
        {name: 'descit', type: 'string'},
        {name: 'azione', type: 'string'},
        {name: 'numgest', type: 'string'}
    ]
});