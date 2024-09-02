/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('snp.view.grids.schede.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-schede',
    requires: [
        'snp.store.grids.attesa.Store',
        'snp.store.grids.chiuse.Store',
        'snp.store.grids.compilate.Store',
        'snp.store.grids.opzioni.Store',
        'snp.store.grids.sospese.Store'
    ],
    stores: {
        storeCompilate:{type:'v1-compilate',autoLoad:false},
        storeOpzioni:{type:'v1-opzioni',autoLoad:false},
        storeAttesa:{type:'v1-attesa',autoLoad:false},
        storeChiuse:{type:'v1-chiuse',autoLoad:false},
        storeSospese:{type:'v1-sospese',autoLoad:false}
    },
    data: {
        titolocompilate:Locale.t('snp.grids.schede.titlecompilate'),
        titoloopzioni:Locale.t('snp.grids.schede.titleopzioni'),
        titoloattesa:Locale.t('snp.grids.schede.titleattesa'),
        titolochiuse:Locale.t('snp.grids.schede.titlechiuse'),
        titolosospese:Locale.t('snp.grids.schede.titlesospese')
    }
});