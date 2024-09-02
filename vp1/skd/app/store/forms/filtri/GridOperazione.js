/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridOperazione', {
    extend: 'Ext.data.Store',
    alias:'store.gridOperazione-filtri',
    fields: [
        {name: 'ope_oper_status_code', type: 'string'}
    ],

    data : []
});