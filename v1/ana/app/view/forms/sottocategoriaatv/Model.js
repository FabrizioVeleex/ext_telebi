/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.sottocategoriaatv.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-sottocategoriaatv',
    requires: [
        'ana.store.forms.sottocategoriaatv.ComboCategoria',
        'ana.store.forms.sottocategoriaatv.Gridrisorse',
        'portal.v1.store.forms.combo.GetUsers'
    ],
    stores: {
        comboCategoria:{type:'v1-combocategoria'},//store categorie
        storeRisorse:{type:'v1-gridrisorse'}, //store riservatezze
        comboUtente:{type:'v1-getusers'} //store utenti riservatezze
    }
});