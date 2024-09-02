/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.filtri.StoreGridCdl', {
    extend: 'Ext.data.Store',
    alias: 'store.gridCdl-filtripick',
    fields: [
        { name: 'ope_work_center_no', type: 'string' },
        { name: 'rep_cdl_wc_des', type: 'string' },
        { name: 'io', type: 'string' }
    ],

    data: []
});