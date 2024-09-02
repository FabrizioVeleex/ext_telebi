/**
 * Created by luca on 24/05/2018.
 */
Ext.define('dip.model.grids.Elenco', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.elenco',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cognome', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'filiale', type: 'string'},
        {name: 'nomeuo', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'interno', type: 'string'}
        ]
});