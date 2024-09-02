Ext.define('dip.model.forms.utente.GridRuoli', {
    extend: 'Ext.data.Model',
    alias: 'model.gridruolo',
    type:'gridruoli',
    fields: [
        {name: 'action', defaultValue: 1},
        {name: 'isnew', defaultValue: 1},
        {name: 'idfunzione', defaultValue: ''},
        {name: 'ruolofunz', defaultValue: ''},

    ]
});