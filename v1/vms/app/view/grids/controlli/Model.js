/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.controlli.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.controlli',
    requires:[
        'vms.store.grids.controlli.Effettuati',
        'vms.store.grids.controlli.Previsti'
    ],
    stores: {
        effettuatistore:{type:'v1-effettuati',autoLoad:false},
        prevististore:{type:'v1-previsti',autoLoad:false}
    },
    data: {
        effettuatititle:Locale.t('vms.grids.controlli.effettuati.title'),
        previstititle:Locale.t('vms.grids.controlli.previsti.title')
    }
});