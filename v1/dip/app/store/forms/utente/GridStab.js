Ext.define('dip.store.forms.utente.GridStab', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridstab',
    requires:[
        'dip.model.forms.utente.GridStab'
    ],
    model:'dip.model.forms.utente.GridStab'
});