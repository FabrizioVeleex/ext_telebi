/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.model.grids.Paesi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.paesi',
    fields: [{name: 'id', type: 'string'},{name: 'alpha2', type: 'string'},{name: 'alpha3', type: 'string'},{name: 'langit', type: 'string'}]
});