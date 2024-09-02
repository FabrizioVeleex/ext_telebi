/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.store.forms.bolla.Gridarticoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridarticoli',
    requires:[
        'bolpas.model.forms.bolla.Gridarticoli'
    ],
    model:'bolpas.model.forms.bolla.Gridarticoli'
});