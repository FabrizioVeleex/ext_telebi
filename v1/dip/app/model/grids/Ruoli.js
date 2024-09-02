/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.model.grids.Ruoli', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.ruoli',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'ruolo', type: 'string'}
        ]
});