/**
 * Created by luke on 27/11/2019.
 */
Ext.define('vms.model.grids.Controlli', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.controlli',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'prodotto', type: 'string'},
        {name: 'matricola', type: 'string'},
        {name: 'durata', type: 'int'},
        {name: 'numprod', type: 'int'},
        {name: 'numero', type: 'string'},
        {name: 'tipologia', type: 'string'},
        {name: 'datac',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'ubicazione', type: 'string'},
        {name: 'datasca',type: 'date',dateFormat: 'Y-m-d'}
    ]
});