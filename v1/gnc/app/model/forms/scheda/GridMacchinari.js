Ext.define('gnc.model.forms.scheda.GridMacchinari', {
    extend: 'Ext.data.Model',
    alias: 'model.gridmacchinari',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'idmonitoraggio', type: 'string',defaultValue:''},
        {name: 'numero', type: 'string',defaultValue:''},
        {name: 'datac', type: 'string',defaultValue: ''},
        {name: 'datasca', type: 'string',defaultValue: ''},
        {name: 'tipologia', type: 'string',defaultValue:''},
        {name: 'prodotto', type: 'string',defaultValue:''},
        {name: 'sede', type: 'string',defaultValue:''}
    ]
});