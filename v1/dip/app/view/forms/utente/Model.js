Ext.define('dip.view.forms.utente.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-utente',
    requires: [
        'dip.store.forms.utente.ComboFiliale',
        'dip.store.forms.utente.ComboFunzioni',
        'dip.store.forms.utente.ComboListUo',
        'dip.store.forms.utente.ComboQualifica',
        'dip.store.forms.utente.ComboRuoliFunz',
        'dip.store.forms.utente.ComboRuolo',
        'dip.store.forms.utente.ComboStab',
        'dip.store.forms.utente.ComboStato',
        'dip.store.forms.utente.ComboUo',
        'dip.store.forms.utente.ComboZone',
        'dip.store.forms.utente.GridAccessi',
        'dip.store.forms.utente.GridRuoli',
        'dip.store.forms.utente.GridStab',
        'dip.store.forms.utente.GridUo'
    ],
    stores: {
        comboListUo: {type: 'v1-combolistuo'}, //store ruolo utente
        comboRuolo: {type: 'v1-comboruoli'}, //store ruolo utente
        comboRuoliFunz: {type: 'v1-combofunzioni'}, //store ruolo utente
        comboQualifica: {type: 'v1-comboqualifica'}, //store ruolo utente
        comboZone: {type: 'v1-combozone'}, //store ruolo utente
        comboStato: {type: 'v1-combostato'}, //store ruolo utente
        comboFiliale:{type:'v1-combofiliale'},
        comboUo:{type:'v1-combouo'}, //store combo UO
        comboFunzioni:{type:'v1-funzionicombo'}, //store combo funzioni UO
        gridUo:{type:'v1-griduo'}, //store UO
        gridRuoliFunz:{type:'v1-gridruoli'}, //store ruoli funzionali
        gridAccessi:{type:'v1-accessi'}, //store ruoli funzionali
        storeStabilimenti:{type:'v1-gridstab'}, //store stabilimenti associati
        comboStabilimenti:{type:'v1-combostab'} //store combo stabilimenti
    },
    data:{
        cardactive:'identificazione',
        valueDisplayAccessi:'',
        valueFieldAccessi:'',
        valueDisplayPredef:'',
    },
    formulas: {

    }
});