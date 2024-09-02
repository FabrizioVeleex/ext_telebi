/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.store.forms.bolla.Gridresi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridresi',
    requires:[
        'bolpas.model.forms.bolla.Gridresi'
    ],
    model:'bolpas.model.forms.bolla.Gridresi'
});