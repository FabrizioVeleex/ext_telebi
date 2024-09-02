/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.model.grids.Sistema', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.sistema',
    fields: [{name: 'id', type: 'string'},{name: 'cognome', type: 'string'},{name: 'nome', type: 'string'}]
});