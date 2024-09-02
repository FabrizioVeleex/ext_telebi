/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridCdl', {
    extend: 'Ext.data.Store',
    alias:'store.gridCdl-filtri',
    fields: [
        {name: 'ope_work_center_no', type: 'string'},
        {name: 'rep_cdl_wc_des', type: 'string'},
        {name: 'io', type: 'string'}
    ],

    data : []
});