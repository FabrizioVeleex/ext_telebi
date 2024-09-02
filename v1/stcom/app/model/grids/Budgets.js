/**
 * Created by luke on 25/11/2019.
 */
Ext.define('stcom.model.grids.Budgets', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.budgets',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'anno', type: 'int'},
        {name: 'cdcli', type: 'string'},
        {name: 'ragsoc', type: 'string'},
        {name: 'totale', type: 'float'}
    ]
});