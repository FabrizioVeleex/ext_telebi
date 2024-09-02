/**
 * Created by luke on 19/11/2019.
 * Usata x la combo grid altre mansioni
 */
Ext.define('fmc.store.forms.scheda.CompetenzeCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-competenzecombo',
    requires: [
        'Ext.data.proxy.Rest',
        'fmc.model.forms.scheda.CompetenzeCombo'
    ],
    model:'fmc.model.forms.scheda.CompetenzeCombo',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/scheda/competenze/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});