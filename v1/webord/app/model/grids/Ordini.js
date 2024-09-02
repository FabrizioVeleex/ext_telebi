/**
 * Created by luke on 01/08/22.
 */
Ext.define('webord.model.grids.Ordini', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.ordini',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'id_ordine', type: 'int'},
        {name: 'codice_cliente', type: 'string'},
        {name: 'ragsoc', type: 'string'},
        {name: 'email_cliente', type: 'string'},
        {name: 'data_ordine',type: 'date',dateFormat: 'c'},
        {name: 'ordine_gestionale', type: 'int'}
    ]
});