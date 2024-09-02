/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vms.view.forms.prodotto.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-prodotto',

    requires: [
        'portal.v1.view.main.global.upload.GridAttachModel',
        'vms.store.forms.prodotto.ComboCostruttore',
        'vms.store.forms.prodotto.ComboSedi',
        'vms.store.forms.prodotto.ComboTipi',
        'vms.store.forms.prodotto.GridControlli',
        'vms.store.forms.prodotto.GridControlliChiusi',
        'vms.store.forms.prodotto.Gridinterventi',
        'vms.view.forms.prodotto.component.Store'
    ],
    stores: {
        storeSedi:{type:'v1-combosedi'}, //store sedi TODO da rimuovere
        storeStabilimenti: { type: "v1-tagstabilimenti" },//store stabilimenti
        storeTipi:{type:'v1-combotipi'}, //store tipi
        storeCostruttori:{type:'v1-combocostruttore'}, //store tipi
        storeControlli:{type:'v1-gridcontrolli'}, //store controlli previsti
        storeControlliChiusi:{type:'v1-gridcontrollichiusi'}, //store controlli effettuati
        storeInterventi:{type:'v1-gridinterventi'}, //store interventi
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
})