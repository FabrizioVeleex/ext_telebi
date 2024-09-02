/**
 * Created by luca on 17/06/2017.
 */
Ext.define('webord.store.forms.ordine.GridArticoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridarticoli',
    requires:[
        'webord.model.forms.ordine.GridArticoli'
    ],
    model:'webord.model.forms.ordine.GridArticoli'
});