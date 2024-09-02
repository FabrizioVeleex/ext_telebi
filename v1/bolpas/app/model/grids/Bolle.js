/**
 * Created by luca on 17/07/2018.
 */
Ext.define('bolpas.model.grids.Bolle', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.archivio',
    fields: [
        {name: 'id', type: 'string'},{name: 'numero', type: 'string'},{name: 'idsoggetto', type: 'string'},{name: 'descrizione', type: 'string'},
        {name: 'creationdate',type: 'date',dateFormat: 'c'},{name: 'datadoc',type: 'date',dateFormat: 'Y-m-d'},{name: 'gestionale', type: 'string'},
        {name: 'spool', type: 'string'},{name: 'numreg', type: 'string'},{name: 'datareg',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'dataclose',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'codice', type: 'string'},{name: 'tipo', type: 'int'},{name: 'tiposogg', type: 'string'}
    ]
});