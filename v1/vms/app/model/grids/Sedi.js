/**
 * Created by luke on 25/11/2019.
 */
Ext.define('vms.model.grids.Sedi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.sedi',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'descrizione', type: 'string'}
    ]
});