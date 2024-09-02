/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('spl.grids.processi.Model', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'dateImport', type: 'date', dateFormat: 'c' },
        { name: 'status', type: 'string' },
        { name: 'tag', type: 'string' },
    ]
});