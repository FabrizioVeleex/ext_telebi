Ext.define('sdc.model.forms.shared.ComboMailto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idrisorsa', type: 'string' },
        {name: 'risorsa', type: 'string' },
        {name: 'modifica'},
        {name: 'isnew',  type: 'boolean', defaultValue:0}
    ]
});