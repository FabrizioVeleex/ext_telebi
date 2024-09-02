/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.formAddArt.gridArtForLotti.StoreArtForLotti', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-itm-form-formaddart-storeartforlotti',
    requires: [
        'itm.forms.articolo.component.formAddArt.gridArtForLotti.ModelArtForLotti'
    ],
    model: 'itm.forms.articolo.component.formAddArt.gridArtForLotti.ModelArtForLotti',
    data: []
});