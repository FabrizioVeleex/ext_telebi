/**
 * Created by luca on 16/12/2016.
 */
Ext.define('amm.model.grids.Stampanti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.stampanti',
    fields: [{name: 'id', type: 'string'},{name: 'stampante', type: 'string'}
        ,{name: 'descrizione', type: 'string'}]
});