/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Moduli', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.moduli',
    fields: [{name: 'id', type: 'string'},{name: 'tagapp', type: 'string'}
        ,{name: 'titolo', type: 'string'},{name: 'descrizione', type: 'string'},{name: 'x', type: 'string'}]
});