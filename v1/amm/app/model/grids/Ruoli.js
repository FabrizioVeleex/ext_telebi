/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Ruoli', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.ruoli',
    fields: [{name: 'id', type: 'string'},{name: 'codice', type: 'string'}
        ,{name: 'nome', type: 'string'},{name: 'descrizione', type: 'string'},{name: 'x', type: 'string'}]
});