/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Famcausali', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.famcausali',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'pfcaus', type: 'string'},
        {name: 'pffami', type: 'string'},
        {name: 'pftecn', type: 'string'},
        {name: 'pffunz', type: 'string'}
    ]
});