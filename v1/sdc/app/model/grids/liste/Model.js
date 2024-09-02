/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.model.grids.liste.Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'autore', type: 'string'}
    ]
});