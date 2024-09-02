/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Steps', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.steps',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'valore', type: 'string'},
        {name: 'descit', type: 'string'}
    ]
})