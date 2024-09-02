Ext.define('gnc.model.forms.scheda.GridCorrelati', {
    extend: 'Ext.data.Model',
    alias: 'model.gridcorrelati',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'codice', type: 'string',defaultValue:''},
        {name: 'cdcom1', type: 'string',defaultValue:''},
        {name: 'depar', type: 'string',defaultValue:''},
        {name: 'notecorr', type: 'string',defaultValue:''}
    ]
});