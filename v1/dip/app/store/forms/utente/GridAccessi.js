Ext.define('dip.store.forms.utente.GridAccessi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-accessi',
    groupField: 'titolo',
    autoLoad:false,
    requires:[
        'dip.model.forms.utente.GridAccessi'
    ],
    model: 'dip.model.forms.utente.GridAccessi'
});