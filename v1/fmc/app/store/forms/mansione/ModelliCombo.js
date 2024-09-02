/**
 * Created by luke on 19/11/2019.
 */
Ext.define('fmc.store.forms.mansione.ModelliCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-modellicombo',
    requires: [
        'Ext.data.proxy.Rest',
        'fmc.model.forms.mansione.ModelliCombo'
    ],
    model:'fmc.model.forms.mansione.ModelliCombo',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/mansione/combomodelli/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});