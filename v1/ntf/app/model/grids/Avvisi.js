/**
 * Created by luca on 07/09/16.
 */
Ext.define('ntf.model.grids.Avvisi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.avvisi',
    fields: [
        {name: 'id', type: 'string', value: ''},{name: 'idrecord', type: 'string', value: ''},{name: 'timenotifica',type: 'date',dateFormat: 'c'}
        ,{name: 'descrizione', type: 'string'},{name: 'motivazione', type: 'string'},{name: 'letto', type: 'string'}
        ,{name: 'titolo', type: 'string'},{name: 'utente', type: 'string'},{name: 'flagletto', type: 'string'}
        ,{name: 'timeletto',type: 'date',dateFormat: 'c'}
    ]
});