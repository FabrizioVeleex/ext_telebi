/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Funzioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.funzioni',
    fields: [{name: 'id', type: 'string'},{name: 'funzione', type: 'string'},{name: 'valore', type: 'int'}]
});