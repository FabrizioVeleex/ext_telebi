/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.pick.GridOperatore', {
    extend: 'Ext.data.Store',
    alias:'store.gridOperatore-pickfiltri',
    fields: [
        {name: 'ope_operatore', type: 'string'}
    ],

    data : []
});