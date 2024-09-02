/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.model.grids.Exdipendenti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.exdipendenti',
    fields: [{name: 'id', type: 'string'},{name: 'cognome', type: 'string'},{name: 'nome', type: 'string'}]
});