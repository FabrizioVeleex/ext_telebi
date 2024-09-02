/**
 * Created by luca on 26/08/16.
 */
Ext.define('amm.model.grids.Moduliwidget', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.moduliwidget',
    fields: [{name: 'id', type: 'string'},{name: 'tagapp', type: 'string'}
        ,{name: 'titolo', type: 'string'},{name: 'descrizione', type: 'string'},{name: 'x', type: 'string'}]
});