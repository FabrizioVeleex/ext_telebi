/**
 * Created by luke on 24/11/2019.
 */
Ext.define('vms.model.grids.Prodotti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.prodotti',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'descrizione', type: 'string'},
        {name: 'matricola', type: 'string'},
        {name: 'reparto', type: 'string'},
        {name: 'tipo', type: 'string'},
        {name: 'sede', type: 'string'}
    ]
});