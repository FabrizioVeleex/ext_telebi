/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.model.grids.Abilitati', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.abilitati',
    fields: [{name: 'id', type: 'string'}, {name: 'cognome', type: 'string'}, {name: 'nome', type: 'string'}
        , {name: 'matricola', type: 'string'}, {name: 'filiale', type: 'string'}]
});