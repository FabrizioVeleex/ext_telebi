/**
 * Created by luca on 16/02/2017.
 */
Ext.define('snp.view.grids.destinatari.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-destinatari',
    requires:[
        'snp.store.grids.destinatari.Store'
    ],
    stores: {
        store:{type:'v1-destinatari',autoLoad:false}
    },
    data: {
        titolo:Locale.t('snp.grids.destinatari.title')
    }
});