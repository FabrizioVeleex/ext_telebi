/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.model.grids.Filiali', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.filiali',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'codice', type: 'string'},
        {name: 'filiale', type: 'string'},
        {name: 'indirizzo', type: 'string'},
        {name: 'telefono', type: 'string'},
        {name: 'breve', type: 'string'},
        {name: 'fax', type: 'string'}
    ]
});