/**
 * Created by luca on 27/10/2017.
 */
Ext.define('ama.model.grids.Schede', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.schede',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'richiesta',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'scadenza',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'articolo', type: 'string'} ,
        {name: 'numero', type: 'string'},
        {name: 'codacr', type: 'string'}
    ]
});