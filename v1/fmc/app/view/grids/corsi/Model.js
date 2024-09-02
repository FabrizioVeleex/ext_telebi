/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.corsi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.corsi',
    requires:[
        'fmc.store.grids.corsi.Effettuati',
        'fmc.store.grids.corsi.Previsti',
        'fmc.store.grids.corsi.Storici'
    ],
    stores: {
        storePrevisti:{type:'v1-previsti',autoLoad:false},
        storeEffettuati:{type:'v1-effettuati',autoLoad:false},
        storeStorici:{type:'v1-storici',autoLoad:false}
    },
    data: {
        titoloPrevisti:Locale.t('fmc.grids.corsi.previsti.title'),
        titoloEffettuati:Locale.t('fmc.grids.corsi.effettuati.title'),
        titoloStorici:Locale.t('fmc.grids.corsi.storici.title')
    }
});