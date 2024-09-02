/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stt.view.forms.vendite.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stt-vendite',

    requires: [
        'stt.view.forms.vendite.components.StoreAnno'
    ],
    stores: {
        storeAnno:{type:'v1-vendite-anno'} //store anno
    }
})