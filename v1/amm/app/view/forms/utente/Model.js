/**
 * Created by luke on 12/02/21.
 */
Ext.define('amm.view.forms.utente.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-utente',

    requires: [
        'amm.store.forms.organigramma.ComboApps',
        'amm.store.forms.organigramma.ComboWidget',
        'amm.store.forms.scrivania.Gridapps',
        'amm.store.forms.scrivania.Gridwidget'
    ],

    stores:{
        storeWidget:{type:'v1-gridwidget'}, //grid widget
        storeApps:{type:'v1-gridapps'}, //grid app veloci
        storeCombowidget:{type:'v1-combowidget-cmp'}, //combo widget
        storeComboapps:{type:'v1-comboapps-cmp'} //combo apps
    }
});