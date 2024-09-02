Ext.define('gnc.model.forms.scheda.ComboFormazione', {
    extend: 'Ext.data.Model',
    alias: 'model.comboformazione',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'numero', type: 'string',defaultValue:''},
        {name: 'datac', type: 'string',defaultValue: ''},
        {name: 'datasca', type: 'string',defaultValue: ''},
        {name: 'tipologia', type: 'string',defaultValue:''},
        {name: 'sede', type: 'string',defaultValue:''},
        {name: 'isnew', type: 'int',defaultValue:1}
    ]
});