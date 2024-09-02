/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.filtri.StoreGridComponent', {
    extend: 'Ext.data.Store',
    alias: 'store.gridComponent-filtripick',
    fields: [
        { name: 'part_no', type: 'string' }
    ],

    data: []
});