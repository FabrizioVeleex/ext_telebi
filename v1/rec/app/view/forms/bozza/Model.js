/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.bozza.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-bozza',
    requires: [
        'portal.v1.store.forms.combo.GetCustomers',
        'rec.store.forms.bozza.ComboCausali',
        'rec.store.forms.bozza.ComboCondrot',
        'rec.store.forms.bozza.ComboContatto',
        'rec.store.forms.bozza.ComboDdt',
        'rec.store.forms.bozza.ComboProdotti',
        'rec.store.forms.bozza.SpedizioneCli',
        'rec.store.forms.bozza.SpedizioneRolcar',
        'rec.store.forms.reso.GridArticoli'
    ],
    stores: {
        gridArticoli:{type:'v1-gridarticoli'},
        storeClienti:{type:'v1-getcustomers'},
        storeContatti:{type:'v1-combocontatto'},
        storeSpedcli:{type:'v1-spedizionecli'},
        storeSpedrolcar:{type:'v1-spedizionerolcar'},
        storeCondorot:{type:'v1-combocondrot'},
        storeProdotti:{type:'v1-comboprodotti'},
        storeDdt:{type:'v1-comboddt'},
        storeCausali:{type:'v1-combocausali'}
    }
})