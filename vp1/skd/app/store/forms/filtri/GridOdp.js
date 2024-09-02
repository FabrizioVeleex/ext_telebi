/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridOdp', {
    extend: 'Ext.data.Store',
    alias:'store.gridOdp-filtri',
    fields: [
        {name: 'sc_op_objstate', type: 'string'}
    ],

    data : []
});