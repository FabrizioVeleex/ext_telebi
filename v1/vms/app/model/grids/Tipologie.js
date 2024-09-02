/**
 * Created by luke on 25/11/2019.
 */
Ext.define('vms.model.grids.Tipologie', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.tipologie',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'descrizione', type: 'string'},
        {name: 'durata', type: 'int'}
    ]
});