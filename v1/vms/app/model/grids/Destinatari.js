/**
 * Created by luke on 25/11/2019.
 */
Ext.define('vms.model.grids.Destinatari', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.destinatari',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'}
    ]
});