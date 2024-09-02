/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Utenti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.utenti',
    fields: [{name: 'id', type: 'string'},{name: 'cognome', type: 'string'}
        ,{name: 'nome', type: 'string'},{name: 'desktop', type: 'string'}]
});