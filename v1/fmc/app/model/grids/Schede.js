/**
 * Created by luca on 27/10/2017.
 */
Ext.define('fmc.model.grids.Schede', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.schede',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'cognome', type: 'string'},
        {name: 'sede', type: 'string'},
        {name: 'matricola', type: 'string'},
        {name: 'mansione', type: 'string'},
        {name: 'mansioni', type: 'string'}
    ]
});