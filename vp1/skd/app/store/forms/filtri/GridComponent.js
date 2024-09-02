/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridComponent', {
    extend: 'Ext.data.Store',
    alias:'store.gridComponent-filtri',
    fields: [
        {name: 'part_no', type: 'string'}
    ],

    data : []
});