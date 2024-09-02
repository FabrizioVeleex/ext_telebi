/**
 * Created by luca on 16/07/2018.
 */
Ext.define('ama.view.forms.scheda.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-scheda',

    requires: [
        'ama.store.forms.scheda.ComboFornitori',
        'ama.store.forms.scheda.ComboProdotto',
        'ama.store.forms.scheda.GridAttivita',
        'ama.store.forms.scheda.GridParametri',
        'portal.v1.store.forms.combo.GetStabilimento'
    ],
    stores: {
        storeStabilimenti:{type:'v1-getstabilimento'}, //store x combo stabilimento
        storeProdotti:{type:'v1-comboprodotto'}, //store x combo articolo
        storeFornitori:{type:'v1-combofornitori'}, //store fornitore
        storeParametri:{type:'v1-gridparametri'}, //altri parametri
        storeAttivita:{type:'v1-gridattivita'} //attività assegnate
    }
})