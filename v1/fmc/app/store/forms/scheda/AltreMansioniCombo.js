/**
 * Created by luke on 19/11/2019.
 * Usata x la combo grid altre mansioni
 */
Ext.define('fmc.store.forms.scheda.AltreMansioniCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-altremansionicombo',
    requires: [
        'Ext.data.proxy.Rest',
        'fmc.model.forms.scheda.AltreMansioniCombo'
    ],
    model:'fmc.model.forms.scheda.AltreMansioniCombo',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/scheda/altemansioni/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});