/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Aziende', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.aziende',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'azienda', type: 'string'},
        {name: 'codice', type: 'string'}
    ]
});