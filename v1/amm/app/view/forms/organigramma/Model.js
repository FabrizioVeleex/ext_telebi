/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.forms.organigramma.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-organigramma',
    requires: [
        'amm.store.forms.organigramma.ComboApps',
        'amm.store.forms.organigramma.ComboFunzioni',
        'amm.store.forms.organigramma.ComboUo',
        'amm.store.forms.organigramma.ComboWidget',
        'amm.store.forms.organigramma.Componenti',
        'amm.store.forms.organigramma.GridFunzioni',
        'amm.store.forms.scrivania.Gridapps',
        'amm.store.forms.scrivania.Gridwidget'
    ],
    stores:{
        storeComponenti:{type:'v1-componenti-uo'}, //store componenti
        comboUo:{type:'v1-combouo'}, //store combo uo
        storeFunzioni:{type:'v1-gridfunzioni'}, //store funzioni assegnate
        comboFunzioni:{type:'v1-combofunzioni'}, //store combo funzioni
        storeWidget:{type:'v1-gridwidget'}, //grid widget
        storeApps:{type:'v1-gridapps'}, //grid app veloci
        storeCombowidget:{type:'v1-combowidget-cmp'}, //combo widget
        storeComboapps:{type:'v1-comboapps-cmp'} //combo apps
    },
    data: {
        cardactive:'info'
    }
});