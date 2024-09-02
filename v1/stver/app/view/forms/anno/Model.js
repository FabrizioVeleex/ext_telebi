/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stver.view.forms.anno.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-andamentoanno',

    requires: [
        'stver.store.forms.anno.StoreAnno',
        'stver.store.forms.filtri.Anno'
    ],
    stores: {
        storeAnno:{type:'v1-versamenti-anno'}, //store anno
        filtroAnno:{type:'v1-stver-filtri-anno'}
    }
})