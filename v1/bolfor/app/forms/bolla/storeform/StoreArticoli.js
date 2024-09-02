/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolfor.forms.bolla.storeform.StoreArticoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-bolfor-gridarticoli',
    requires:[
        'bolfor.forms.bolla.modelform.GridArticoli'
    ],
    model:'bolfor.forms.bolla.modelform.GridArticoli'
});