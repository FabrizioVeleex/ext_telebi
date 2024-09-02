/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.model.grids.Sottocategorieatv', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.sottoategorieatv',
    fields: [{name: 'id', type: 'string'},{name: 'categoria', type: 'string'}
        ,{name: 'nome', type: 'string'},{name: 'riservata', type: 'string'}]
});