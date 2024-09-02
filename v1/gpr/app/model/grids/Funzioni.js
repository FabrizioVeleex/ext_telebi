/**
 * Created by luca on 07/11/2016.
 */
Ext.define('gpr.model.grids.Funzioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.funzioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'codice',defaultValue:''},
        {name: 'descrizione',defaultValue:''},
        {name: 'colonna',defaultValue:''}
    ]
});