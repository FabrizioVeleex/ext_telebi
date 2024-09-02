/**
 * Created by luca on 13/09/16.
 */
Ext.define('ntf.model.grids.Notifiche', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.notifiche',
    fields: [
        {name: 'id', type: 'string', value: ''}, {name: 'idrecord', type: 'string'},
        {name: 'datanotifica',type: 'date',dateFormat: 'c'},
        {name: 'descrizione', type: 'string'}, {name: 'motivazione', type: 'string'}, {name: 'eseguito', type: 'string'},
        {name: 'titolo', type: 'string'}, {name: 'utente', type: 'string'},
        {name: 'dataeseguito',type: 'date',dateFormat: 'c'}
    ]
});