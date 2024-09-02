/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Azioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.azioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'valore', type: 'string'},
        {name: 'azione', type: 'string'}
    ]
})