/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stver.view.forms.mese.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-andamentomese',

    requires: [
        'stver.store.forms.filtri.Anno',
        'stver.store.forms.mese.StoreMese'
    ],
    stores: {
        storeMese:{type:'v1-versamenti-mese'}, //store mese
        filtroAnno:{type:'v1-stver-filtri-anno'}
    }
})