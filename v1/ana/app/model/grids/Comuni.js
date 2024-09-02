/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.model.grids.Comuni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.comuni',
    fields: [{name: 'id', type: 'string'},{name: 'comune', type: 'string'},{name: 'regione', type: 'string'}
        ,{name: 'provincia', type: 'string'},{name: 'cap', type: 'string'},{name: 'codfis', type: 'string'},{name: 'codistat', type: 'string'}]
});