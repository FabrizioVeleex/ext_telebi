/**
 * Created by luca on 10/11/2016.
 */
Ext.define('gpr.model.grids.Descrizioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.descrizioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'codice',defaultValue:''},
        {name: 'descrizione',defaultValue:''},
        {name: 'lingua',defaultValue:''}
    ]
});