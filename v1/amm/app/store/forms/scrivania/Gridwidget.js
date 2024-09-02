/**
 * Created by luke on 29/07/21.
 */
Ext.define('amm.store.forms.scrivania.Gridwidget', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridwidget',
    requires:[
        'amm.model.forms.scrivania.Gridwidget'
    ],
    model:'amm.model.forms.scrivania.Gridwidget'
});