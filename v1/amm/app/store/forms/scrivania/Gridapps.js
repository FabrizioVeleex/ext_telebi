/**
 * Created by luke on 29/07/21.
 */
Ext.define('amm.store.forms.scrivania.Gridapps', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridapps',
    requires:[
        'amm.model.forms.scrivania.Gridapps'
    ],
    model:'amm.model.forms.scrivania.Gridapps'
});