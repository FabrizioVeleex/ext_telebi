/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sgv.view.grids.segnalazioni.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-segnalazioni',
    requires: [
        'sgv.view.grids.segnalazioni.bozze.Store',
        'sgv.view.grids.segnalazioni.chiuse.Store',
        'sgv.view.grids.segnalazioni.inoltrate.Store',
        'sgv.view.grids.segnalazioni.istruttoria.Store'
    ],
    stores: {
        storeBozze:{type:'v1-bozze',autoLoad:false},
        storeInoltrate:{type:'v1-inoltrate',autoLoad:false},
        storeIstruttoria:{type:'v1-istruttoria',autoLoad:false},
        storeChiuse:{type:'v1-chiuse',autoLoad:false}
    },
    data: {
        titolobozze:Locale.t('sgv.grids.segnalazioni.titlebozze'),
        titoloinoltrate:Locale.t('sgv.grids.segnalazioni.titleinoltrate'),
        titoloistruttoria:Locale.t('sgv.grids.segnalazioni.titleistruttoria'),
        titolochiuse:Locale.t('sgv.grids.segnalazioni.titlechiuse')
    }
});