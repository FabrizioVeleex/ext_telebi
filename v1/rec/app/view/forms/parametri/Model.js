/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.parametri.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-parametri',

    requires: [
        'portal.v1.store.forms.combo.GetUsers'
    ],

    stores: {
        comboUtente:{type:'v1-getusers'},
        comboUtente2:{type:'v1-getusers'}
    }
});