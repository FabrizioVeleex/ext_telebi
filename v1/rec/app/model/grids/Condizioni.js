/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Condizioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.condizioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'lingua', type: 'string'},
        {name: 'titolo', type: 'string'}
    ]
});