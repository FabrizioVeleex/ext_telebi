Ext.define('dip.model.grids.Utenti', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'disabled', type: 'boolean'},
        {name: 'matricola', type: 'string'},
        {name: 'cognome', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'shortname', type: 'string'},
        {name: 'telefono', type: 'string'},
        {name: 'cellulare', type: 'string'},
        {name: 'filiale', type: 'string'},
        {name: 'idfiliale', type: 'string'},
        {name: 'nomeuo', type: 'string'},
        {name: 'email', type: 'string'}],
});