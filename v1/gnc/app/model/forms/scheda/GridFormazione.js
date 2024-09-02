Ext.define('gnc.model.forms.scheda.GridFormazione', {
    extend: 'Ext.data.Model',
    alias: 'model.gridformazione',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'idcorso', type: 'string',defaultValue:''},
        {name: 'numero', type: 'string',defaultValue:''},
        {name: 'datac', type: 'string',defaultValue: ''},
        {name: 'datasca', type: 'string',defaultValue: ''},
        {name: 'tipologia', type: 'string',defaultValue:''},
        {name: 'sede', type: 'string',defaultValue:''}
    ]
});