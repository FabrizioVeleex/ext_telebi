/**
 * Created by luke on 19/11/2019.
 */
Ext.define('fmc.store.forms.corso.UtentiCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-utenticombo',
    requires: [
        'Ext.data.proxy.Rest',
        'fmc.model.forms.corso.UtentiCombo'
    ],
    model:'fmc.model.forms.corso.UtentiCombo',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/corso/utenticombo/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});