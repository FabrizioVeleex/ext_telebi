/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stres.view.forms.cliente.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stres-cliente',

    requires: [
        'stres.store.forms.cliente.GridStore',
        'stres.store.forms.filtri.Articolo',
        'stres.store.forms.filtri.Cliente'
    ],
    stores: {
        storeClienti:{type:'v1-stres-cliente'}, //store resi x cliente
        clientiStore:{type:'v1-stres-filtri-clienti'}, //filtro cliente
        articoliStore:{type:'v1-stres-filtri-articoli'} //filtro articolo
    }
})