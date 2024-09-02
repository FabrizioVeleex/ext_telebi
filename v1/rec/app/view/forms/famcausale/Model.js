/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.famcausale.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-famcausale',
    requires: [
        'rec.store.forms.famcausale.ComboCausale',
        'rec.store.forms.famcausale.ComboFamiglia'
    ],
    stores: {
        comboCausale:{type:'v1-combocausale'},//store causali
        comboFamiglia:{type:'v1-combofamiglia'} //store famiglie
    }
});