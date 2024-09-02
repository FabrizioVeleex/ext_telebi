/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.articolo.ArticoloViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-itm-form-articolo',

    requires: [
        'itm.forms.articolo.component.gridAttributi.StoreAttributi',
        'itm.forms.articolo.component.gridForniture.StoreForniture',
        'itm.forms.articolo.component.comboClasse.storeClasse',
        'itm.forms.articolo.component.comboFamiglie.storeFamiglia',
        'itm.forms.articolo.component.comboGruppi.storeGruppo',
        'itm.forms.articolo.component.comboSottogruppi.storeSottogruppo',
        'itm.forms.articolo.component.gridlegami.StoreLegami',
        // 'itm.forms.articolo.component.gridDocs.StoreDocs',
        // 'itm.forms.articolo.component.comboTipologia.storeTipologia',
        'itm.forms.articolo.component.formAddArt.StoreArtFor'

    ],
    stores: {
        storeClassi: { type: 'v1-itm-form-articoli-comboclasse' }, //store classi
        storeFamiglie: { type: 'v1-itm-form-articoli-combofamiglia' }, //store famiglie
        storeGruppi: { type: 'v1-itm-form-articoli-combogruppo' }, //store gruppi
        storeSottogruppi: { type: 'v1-itm-form-articoli-combosottogruppo' }, //store sottogruppi
        // storeTipologia: { type: 'v1-itm-form-articoli-combotipologia' }, //store tipologia
        storeAttributi: { type: 'v1-itm-grid-articoli-attributi' }, //store attributi
        storeLegami: { type: 'v1-itm-grid-articoli-legami' }, //store attributi
        storeForniture: { type: 'v1-itm-grid-articoli-forniture' }, //store forniture
        // storeDocs: { type: 'v1-itm-grid-articoli-docs' }, //store docs
        storeArtFor: { type: 'v1-itm-form-formaddart-storeartfor' }, //store grid articoli fornitore
        storeArtForLotti: { type: 'v1-itm-form-formaddart-storeartforlotti' }, //store grid lotti articoli fornitore
    },
    data: {
        columnLink: true,
        cardactive: "dashboard",
        hide: {
            attributi: true,
            fornutire: true
        },
        newArticoloFornitore: {
            acqlist01: {
                azienda: "",
                id_for: "",
                cd_art: "",
                descr_art: "",
                um: "",
                data_start: "",
                data_end: "",
                prezzo: ""
            },
            acqlist02: []
        }
    }
})