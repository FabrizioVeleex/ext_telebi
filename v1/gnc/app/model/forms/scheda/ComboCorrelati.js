Ext.define('gnc.model.forms.scheda.ComboCorrelati', {
    extend: 'Ext.data.Model',
    alias: 'model.combocorrelati',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'codice', type: 'string',defaultValue:''},
        {name: 'cdcom1', type: 'string',defaultValue: ''},
        {name: 'depar', type: 'string',defaultValue:''}
    ]
});