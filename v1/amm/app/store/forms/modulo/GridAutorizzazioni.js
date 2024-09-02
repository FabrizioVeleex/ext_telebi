/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.store.forms.modulo.GridAutorizzazioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridautorizzazioni',
    requires:[
        'amm.model.forms.modulo.GridAutorizzazioni'
    ],
    model:'amm.model.forms.modulo.GridAutorizzazioni',
    data:[]
});