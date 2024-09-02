/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.corso.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-corso',

    requires: [
        'fmc.store.forms.corso.GridUtenti',
        'fmc.store.forms.corso.UtentiCombo',
        'fmc.store.forms.modello.ComboTipologie',
        'portal.v1.store.forms.combo.GetStabilimento',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    stores: {
        storeTipologie:{type:'v1-combotipologie'}, //store tipologie
        storeSedi:{type:'v1-getstabilimento'}, //store sedi
        storeUtenti:{type:'v1-gridutenti'}, //store partecipanti
        comboUtenti:{type:'v1-utenticombo'}, //combo partecipanti
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
})