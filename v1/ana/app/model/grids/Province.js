/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.model.grids.Province', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.province',
    fields: [{name: 'id', type: 'string'},{name: 'codice', type: 'string'},{name: 'provincia', type: 'string'}]
});