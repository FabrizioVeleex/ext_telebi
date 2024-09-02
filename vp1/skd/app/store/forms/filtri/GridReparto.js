/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridReparto', {
    extend: 'Ext.data.Store',
    alias:'store.gridReparto-filtri',
    fields: [
        {name: 'rep_cdl_department_no', type: 'string'},
        {name: 'io', type: 'string'}
    ],

    data : []
});