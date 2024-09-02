/**
 * Created by luca on 14/02/2018.
 */
Ext.define('fmc.model.grids.Tipologie', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.tipologie',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'descrizione', type: 'string'},
        {name: 'abilitata', type: 'string'},
        {name: 'obbligo', type: 'string'}
    ]
});