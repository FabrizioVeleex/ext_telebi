/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.modello.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-modello',

    requires: [
        'fmc.store.forms.modello.ComboTipologie',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],

    stores: {
        storeTipologie:{type:'v1-combotipologie'}, //store tipologie
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
})