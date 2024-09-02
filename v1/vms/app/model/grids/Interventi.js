/**
 * Created by luke on 27/11/2019.
 */
Ext.define('vms.model.grids.Interventi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.interventi',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'prodotto', type: 'string'},
        {name: 'matricola', type: 'string'},
        {name: 'numprod', type: 'int'},
        {name: 'numero', type: 'string'},
        {name: 'datac',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'ubicazione', type: 'string'},
        {name: 'datasca',type: 'date',dateFormat: 'Y-m-d'}
    ]
});