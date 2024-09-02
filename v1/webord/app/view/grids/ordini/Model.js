/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('webord.view.grids.ordini.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-ordini',
    requires: [
        'webord.store.grids.annullati.Store',
        'webord.store.grids.bloccati.Store',
        'webord.store.grids.nuovi.Store',
        'webord.store.grids.trasmessi.Store'
    ],
    stores: {
        storeBloccati:{type:'v1-bloccati',autoLoad:false},
        storeTrasmessi:{type:'v1-trasmessi',autoLoad:false},
        storeNuovi:{type:'v1-nuovi',autoLoad:false},
        storeAnnullati:{type:'v1-annullati',autoLoad:false}
    },
    data: {
        titolobloccati:Locale.t('webord.grids.ordini.titlebloccati'),
        titolotrasmessi:Locale.t('webord.grids.ordini.titletrasmessi'),
        titolonuovi:Locale.t('webord.grids.ordini.title'),
        titoloannullati:Locale.t('webord.grids.ordini.titleannullati')
    }
});