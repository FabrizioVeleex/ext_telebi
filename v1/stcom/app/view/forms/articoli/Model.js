/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stcom.view.forms.articoli.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stcom-articoli',

    requires: [
        'stcom.store.forms.articoli.GridStore',
        'stcom.store.forms.articoli.StoreClienti',
        'stcom.store.forms.filtri.Articolo',
        'stcom.store.forms.filtri.Capoarea',
        'stcom.store.forms.filtri.Classe',
        'stcom.store.forms.filtri.Cliente',
        'stcom.store.forms.filtri.Mesi',
        'stcom.store.forms.filtri.Nazione',
        'stcom.store.forms.filtri.Regione',
        'stcom.store.forms.filtri.Tipocli'
    ],
    stores: {
        storeArticoli:{type:'v1-stcom-articoli'}, //store vendite pezzi
        clientiStore:{type:'v1-stcom-clienti'}, //filtro cliente
        tipocliStore:{type:'v1-stcom-tipocli'}, //filtro tipologia cliente
        capoareaStore:{type:'v1-stcom-capoarea'}, //filtro capo area
        nazioneStore:{type:'v1-stcom-nazione'}, //filtro nazione
        regioneStore:{type:'v1-stcom-regione'}, //filtro regione
        classeStore:{type:'v1-stcom-classe'}, //filtro classe merceologica
        articoloStore:{type:'v1-stcom-articolo'}, //filtro articolo
        meseStore:{type:'v1-stcom-mesi'}, //filtro mesi
        storeClientiDettaglio:{type:'v1-stcom-articoli-clienti'} //store dettaglio clienti su singolo articolo
    }
})