/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.GridStato', {
    extend: 'Ext.data.Store',
    alias: 'store.gridStato-filtri',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'stato', type: 'string' },
        { name: 'io', type: 'string', defaultValue: 'in' },
        { name: 'descrizione', type: 'string', defaultValue: '' },
    ],

    data: []
});