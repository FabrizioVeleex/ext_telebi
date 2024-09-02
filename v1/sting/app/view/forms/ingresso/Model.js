/**
 * Created by luca on 16/07/2018.
 */
Ext.define('sting.view.forms.ingresso.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-sting-ingresso',

    requires: [
        'sting.store.forms.ingresso.GridStore',
        'sting.store.forms.ingresso.filtri.Articolo',
        'sting.store.forms.ingresso.filtri.Fornitore'
    ],
    stores: {
        storeIngressi:{type:'v1-sting-ingresso'}, //store ingressi
        fornitoriStore:{type:'v1-sting-fornitori'}, //filtro fornitore
        articoliStore:{type:'v1-sting-articoli'}, //filtro articoli
    }
})