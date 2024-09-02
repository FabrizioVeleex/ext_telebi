/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.formAddArt.StoreArtFor', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-itm-form-formaddart-storeartfor',
    requires: [
        'itm.forms.articolo.component.formAddArt.gridArtFor.ModelArtFor'
    ],
    model: 'itm.forms.articolo.component.formAddArt.gridArtFor.ModelArtFor',
    data: []
});