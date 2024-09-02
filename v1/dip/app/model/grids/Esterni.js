Ext.define('dip.model.grids.Esterni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.esterni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'matricola', type: 'string'},
        {name: 'cognome', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'shortname', type: 'string'},
        {name: 'telefono', type: 'string'},
        {name: 'cellulare', type: 'string'},
        {name: 'filiale', type: 'string'},
        {name: 'nomeuo', type: 'string'},
        {name: 'email', type: 'string'}]
});