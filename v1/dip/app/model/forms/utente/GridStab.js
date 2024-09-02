Ext.define('dip.model.forms.utente.GridStab', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'action', defaultValue: 1},
        {name: 'isnew', defaultValue: 1},
        {name: 'iduser', defaultValue: ''},
        {name: 'idstabilimento', defaultValue: ''},
    ]
});