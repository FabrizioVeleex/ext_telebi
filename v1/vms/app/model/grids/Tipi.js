/**
 * Created by luke on 25/11/2019.
 */
Ext.define('vms.model.grids.Tipi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.tipi',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'tipo', type: 'string'},
        {name: 'descrizione', type: 'string'}
    ]
});