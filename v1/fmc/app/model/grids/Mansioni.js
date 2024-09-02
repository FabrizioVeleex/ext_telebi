/**
 * Created by luke on 03/10/2019.
 */
Ext.define('fmc.model.grids.Mansioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.mansioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'descrizione', type: 'string'}
    ]
});