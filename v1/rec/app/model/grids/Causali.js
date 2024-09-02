/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Causali', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.causali',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'pscaus', type: 'string'},
        {name: 'psdesc', type: 'string'},
        {name: 'giorni', type: 'int'},
        {name: 'obbfornitore', type: 'string'},
        {name: 'sito', type: 'string'}
    ]
});