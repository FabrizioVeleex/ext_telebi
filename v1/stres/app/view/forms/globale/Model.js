/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stres.view.forms.globale.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stres-globale',

    requires: [
        'stres.store.forms.articolo.GridStore',
        'stres.store.forms.filtri.Cliente',
        'stres.store.forms.globale.GridStore'
    ],
    stores: {
        storeGlobale:{type:'v1-stres-globale'},
        clientiStore:{type:'v1-stres-filtri-clienti'}, //filtro cliente
        articoliStore:{type:'v1-stres-articolo'} //filtro articolo
    }
})