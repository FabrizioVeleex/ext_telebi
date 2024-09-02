/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Voci', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.voci',
    fields: [{name: 'id', type: 'string'},{name: 'tipovoce', type: 'string'}
        ,{name: 'voce', type: 'string'},{name: 'descrizione', type: 'string'},{name: 'x', type: 'string'}]
});