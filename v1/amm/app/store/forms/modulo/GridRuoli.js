/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.store.forms.modulo.GridRuoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridruoli',
    requires:[
        'amm.model.forms.modulo.GridRuoli'
    ],
    model:'amm.model.forms.modulo.GridRuoli',
    data:[]
});