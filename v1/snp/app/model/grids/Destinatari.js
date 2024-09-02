/**
 * Created by luke on 25/11/2019.
 */
Ext.define('snp.model.grids.Destinatari', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.destinatari',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'risorsa', type: 'string'},
        {name: 'opzionedesc', type: 'string'}
    ]
});