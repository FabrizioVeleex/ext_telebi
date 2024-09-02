Ext.define('gnc.model.forms.scheda.GridCollaudo', {
    extend: 'Ext.data.Model',
    alias: 'model.gridcollaudo',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'idscheda', type: 'string',defaultValue:''},
        {name: 'numero', type: 'string',defaultValue:''},
        {name: 'codacr', type: 'string',defaultValue: ''},
        {name: 'tipologia', type: 'string',defaultValue:''},
        {name: 'articolo', type: 'string',defaultValue:''},
        {name: 'fornitore', type: 'string',defaultValue:''},
        {name: 'stato', type: 'string',defaultValue:''}
    ]
});