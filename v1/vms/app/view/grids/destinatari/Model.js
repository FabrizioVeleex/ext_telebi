/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.destinatari.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.destinatari',
    requires:[
        'vms.store.grids.destinatari.Store'
    ],
    stores: {
        store:{type:'v1-destinatari',autoLoad:false}
    },
    data: {
        titolo:Locale.t('vms.grids.destinatari.title')
    }
});