/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.categoriaatv.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-categoriaatv',

    requires: [
        'ana.store.forms.categoriaatv.GridSottocategorie'
    ],

    stores:{
         storeSottocategorie:{type:'v1-gridsottocategorie'},
    }
});