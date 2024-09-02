/**
 * Created by luke on 15/11/2019.
 */
Ext.define('fmc.model.grids.Modelli', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.modelli',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'tipologia', type: 'string'}
    ]
});