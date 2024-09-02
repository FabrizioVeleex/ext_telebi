/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stres.view.forms.articolo.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stres-articolo',

    requires: [
        'stres.store.forms.articolo.GridStore',
        'stres.store.forms.filtri.Articolo',
        'stres.store.forms.filtri.Cliente'
    ],
    stores: {
        storeArticoli:{type:'v1-stres-articolo'}, //store resi x articolo
        articoliStore:{type:'v1-stres-filtri-articoli'}, //filtro articolo
        clientiStore:{type:'v1-stres-filtri-clienti'}, //filtro cliente
    }
})