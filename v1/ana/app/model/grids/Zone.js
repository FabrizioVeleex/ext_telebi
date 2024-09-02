/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.model.grids.Zone', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.zone',
    fields: [{name: 'id', type: 'string'}, {name: 'codice', type: 'string'},
        {name: 'descrizione', type: 'string'}, {name: 'cognomenome', type: 'string'}
    ]
});