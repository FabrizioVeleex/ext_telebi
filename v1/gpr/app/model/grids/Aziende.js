/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.model.grids.Aziende', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.aziende',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'azienda',defaultValue:''},
        {name: 'codifica',defaultValue:''}
    ]
});