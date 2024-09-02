/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.reso.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-reso',
    requires: [
        'portal.v1.store.forms.combo.GetSuppliers',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridImageModel',
        'rec.store.forms.bozza.ComboDdt',
        'rec.store.forms.bozza.ComboProdotti',
        'rec.store.forms.reso.ComboAzione',
        'rec.store.forms.reso.ComboCausali',
        'rec.store.forms.reso.ComboDdt',
        'rec.store.forms.reso.ComboProdotti',
        'rec.store.forms.reso.ComboProdottiTecnico',
        'rec.store.forms.reso.ComboValido',
        'rec.store.forms.reso.GridArticoli',
        'rec.store.forms.reso.GridImagesRiga',
        'rec.store.forms.reso.GridRicevuti'
    ],
    stores: {
        gridArticoli:{type:'v1-gridarticoli'},
        gridRicevuti:{type:'v1-gridricevuti'},
        storeCausaliAll:{type:'v1-combocausaliall'},
        storeProdottiAll:{type:'v1-comboprodottiall'},//tutti i prodotti
        storeProdotti:{type:'v1-comboprodotti'}, //filtra prodotti x cliente
        storeProdottiTecnico:{type:'v1-comboprodottitecnico'}, //filtra prodotti x caricamento del tecnico
        storeDdtAll:{type:'v1-comboddtall'},//tutte le bolle
        storeDdt:{type:'v1-comboddt'}, //filtra bolle x cliente
        storeAzioni:{type:'v1-comboazione'},
        storeValido:{type:'v1-combovalido'},
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'}, //allegati standard
        storeImmagini: {model:'portal.v1.view.main.global.upload.GridImageModel'}, //grid allegati testata
        storeImmaginiRiga: {type:'v1-gridimagesriga'}, //grid allegati riga
        storeFornitore:{type:'v1-getsuppliers'} //store fornitori
    }
})