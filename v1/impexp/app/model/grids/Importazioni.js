/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.model.grids.Importazioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.importazioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'cognomenome', type: 'string'},
        {name: 'creationdate', type: 'date',dateFormat: 'c'}
    ]
});