/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Clienti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.clienti',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cdcli', type: 'string'},
        {name: 'ragsoc', type: 'string'}
    ]
})