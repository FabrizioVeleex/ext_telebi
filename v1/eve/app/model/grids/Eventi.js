/**
 * Created by luca on 27/07/16.
 */
Ext.define('eve.model.grids.Eventi', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string', value: ''},
        {name: 'nome', type: 'string'},
        {name: 'luogo', type: 'string'},
        {name: 'datain',type: 'date',dateFormat: 'c'},
        {name: 'datafin',type: 'date',dateFormat: 'c'}
    ]
});