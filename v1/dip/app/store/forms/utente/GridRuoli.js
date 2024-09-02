Ext.define('dip.store.forms.utente.GridRuoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridruoli',
    requires:[
        'dip.model.forms.utente.GridRuoli'
    ],
    model:'dip.model.forms.utente.GridRuoli'
});