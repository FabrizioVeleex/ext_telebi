/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridLab', {
    extend: 'Ext.data.Store',
    alias:'store.gridLab-filtri',
    fields: [
        {name: 'sc_op_lab', type: 'string'}
    ],

    data : []
});