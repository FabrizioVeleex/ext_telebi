/**
 * Created by luca on 16/07/2018.
 */
Ext.define('eve.view.forms.scheda.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-scheda',

    requires: [
        'eve.store.forms.scheda.GridContatti',
        'eve.store.forms.scheda.LingueCombo',
        'eve.store.forms.scheda.MansioniCombo',
        'eve.store.forms.scheda.NazioniCombo',
        'eve.store.forms.scheda.ZoneCombo',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    stores:{
        storeContatti:{type:'v1-gridcontatti'},
        storeNazioni:{type:'v1-nazionicombo'},
        storeLingue:{type:'v1-linguecombo'},
        storeZone:{type:'v1-zonecombo'},
        storeMansioni:{type:'v1-mansionicombo'},
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    },
})