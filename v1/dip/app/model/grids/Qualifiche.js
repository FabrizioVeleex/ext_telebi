/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.model.grids.Qualifiche', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.qualifiche',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'qualifica', type: 'string'}
        ]
});