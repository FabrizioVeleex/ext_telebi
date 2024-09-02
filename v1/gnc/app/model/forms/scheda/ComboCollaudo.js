Ext.define('gnc.model.forms.scheda.ComboCollaudo', {
    extend: 'Ext.data.Model',
    alias: 'model.combocollaudo',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'numero', type: 'string',defaultValue:''},
        {name: 'codacr', type: 'string',defaultValue: ''},
        {name: 'tipologia', type: 'string',defaultValue:''},
        {name: 'articolo', type: 'string',defaultValue:''},
        {name: 'fornitore', type: 'string',defaultValue:''},
        {name: 'stato', type: 'string',defaultValue:''},
        {name: 'isnew', type: 'int',defaultValue:1}
    ]
});