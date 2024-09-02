/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridOrder', {
    extend: 'Ext.data.Store',
    alias:'store.gridOrder-filtri',
    fields: [
        {name: 'field', type: 'string'},
        {name: 'sc_op_order_no', type: 'string'},
        {name: 'sc_op_release_no', type: 'string'},
        {name: 'sc_op_sequence_no', type: 'string'}
    ],

    data : []
});