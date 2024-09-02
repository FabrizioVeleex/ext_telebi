/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.model.grids.domini.Model', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.domini',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'valore', type: 'string'},
        {name: 'tipo', type: 'string'}
    ]
});