/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridPart', {
    extend: 'Ext.data.Store',
    alias:'store.gridPart-filtri',
    fields: [
        {name: 'sc_op_part_no', type: 'string'}
    ],

    data : []
});