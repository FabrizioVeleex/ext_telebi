/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Organigrammi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.organigrammi',
    fields: [{name: 'id', type: 'string'},{name: 'nome', type: 'string'},
        {name: 'desktop', type: 'string'},{name: 'descrizione', type: 'string'},
        {name: 'email', type: 'string'},{name: 'x', type: 'string'}]
});