/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.interventi.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.interventi',
    requires:[
        'vms.store.grids.interventi.Completati',
        'vms.store.grids.interventi.Incorso'
    ],
    stores: {
        incorsostore:{type:'v1-incorso',autoLoad:false},
        completatistore:{type:'v1-completati',autoLoad:false}
    },
    data: {
        incorsotititle:Locale.t('vms.grids.interventi.incorso.title'),
        completatititle:Locale.t('vms.grids.interventi.completati.title')
    }
});