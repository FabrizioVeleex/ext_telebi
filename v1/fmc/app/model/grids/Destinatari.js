/**
 * Created by luke on 03/10/2019.
 */
Ext.define('fmc.model.grids.Destinatari', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.destinatari',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'}
    ]
});