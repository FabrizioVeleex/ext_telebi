/**
 * Created by luke on 12/02/21.
 */
Ext.define('amm.view.forms.scrivania.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-scrivania',

    requires: [
        'amm.store.forms.scrivania.ComboApps',
        'amm.store.forms.scrivania.ComboWidget',
        'amm.store.forms.scrivania.Gridapps',
        'amm.store.forms.scrivania.Gridwidget'
    ],
    stores:{
        storeWidget:{type:'v1-gridwidget'}, //grid widget
        storeApps:{type:'v1-gridapps'}, //grid app veloci
        storeCombowidget:{type:'v1-combowidget'}, //combo widget
        storeComboapps:{type:'v1-comboapps'} //combo apps
    }
});