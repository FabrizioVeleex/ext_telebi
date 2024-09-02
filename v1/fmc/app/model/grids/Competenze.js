/**
 * Created by luca on 2019-12-12.
 */
Ext.define('fmc.model.grids.Competenze', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.competenze',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'descrizione', type: 'string'}
    ]
});