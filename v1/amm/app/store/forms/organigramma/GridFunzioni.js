/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.store.forms.organigramma.GridFunzioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridfunzioni',
    requires:[
        'amm.model.forms.organigramma.GridFunzioni'
    ],
    model:'amm.model.forms.organigramma.GridFunzioni',
    data:[]
});