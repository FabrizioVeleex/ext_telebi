/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.model.grids.Parametri', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.parametri',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'descrizione', type: 'string'}
        ]
});