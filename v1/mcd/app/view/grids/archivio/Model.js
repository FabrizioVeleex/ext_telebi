/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.view.grids.archivio.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.archivio',
    requires:[
        'mcd.store.grids.archivio.Store'
    ],
    stores: {
        store:{type:'v1-archivio',autoLoad:false}
    },
    data: {
        titolo:Locale.t('mcd.grids.archivio.title')
    }
});