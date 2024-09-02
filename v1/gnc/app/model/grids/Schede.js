/**
 * Created by luke on 01/08/22.
 */
Ext.define('gnc.model.grids.Schede', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.schede',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'tipo', type: 'string'},
        {name: 'datadoc',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'step', type: 'int'},
        {name: 'stabilimento', type: 'string'},
        {name: 'cdart', type: 'string'},
        {name: 'articolo', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'esito', type: 'int'},
        {name: 'descrizione', type: 'string'},
        {name: 'risultato', type: 'string'}
    ]
});