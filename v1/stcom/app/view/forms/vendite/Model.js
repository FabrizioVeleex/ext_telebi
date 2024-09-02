/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stcom.view.forms.vendite.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stcom-vendite',

    requires: [
        'stcom.store.forms.filtri.Capoarea',
        'stcom.store.forms.filtri.Cliente',
        'stcom.store.forms.filtri.Mesi',
        'stcom.store.forms.filtri.Nazione',
        'stcom.store.forms.filtri.Regione',
        'stcom.store.forms.filtri.Tipocli',
        'stcom.store.forms.vendite.GridStore'
    ],
    stores: {
        storeVendite:{type:'v1-stcom-vendite'}, //store vendite
        clientiStore:{type:'v1-stcom-clienti'}, //filtro cliente
        tipocliStore:{type:'v1-stcom-tipocli'}, //filtro tipologia cliente
        capoareaStore:{type:'v1-stcom-capoarea'}, //filtro capo area
        nazioneStore:{type:'v1-stcom-nazione'}, //filtro nazione
        regioneStore:{type:'v1-stcom-regione'}, //filtro regione
        meseStore:{type:'v1-stcom-mesi'} //filtro mesi
    }
})