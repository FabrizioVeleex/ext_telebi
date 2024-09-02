/**
 * Created by luca on 16/07/2018.
 */
Ext.define('mcd.view.forms.parametri.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-parametri',
    requires:[
        'mcd.store.forms.parametri.Combofolder',
        'mcd.store.forms.parametri.Combouo'
    ],
    stores: {
        comboUo:{type:'v1-combouo'},
        comboFolder:{type:'v1-combofolder'}
    }
});