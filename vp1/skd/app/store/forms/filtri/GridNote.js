/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridNote', {
    extend: 'Ext.data.Store',
    alias:'store.gridNote-filtri',
    fields: [
        {name: 'nota', type: 'string'}
    ],

    data : []
});