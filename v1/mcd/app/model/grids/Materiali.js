/**
 * Created by luca on 16/07/2018.
 */
Ext.define('mcd.model.grids.Materiali', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.materiali',
    fields: [{name: 'id', type: 'string'},{name: 'descrizione', type: 'string'}]
});