/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.store.forms.modulo.GridVersioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridversioni',
    requires:[
        'amm.model.forms.modulo.GridVersioni'
    ],
    model:'amm.model.forms.modulo.GridVersioni',
    data:[]
});