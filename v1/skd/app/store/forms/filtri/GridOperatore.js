/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridOperatore', {
    extend: 'Ext.data.Store',
    alias:'store.gridOperatore-filtri',
    fields: [
        {name: 'ope_operatore', type: 'string'}
    ],

    data : []
});