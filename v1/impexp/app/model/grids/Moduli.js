/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.model.grids.Moduli', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.moduli',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'codice', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'tipo', type: 'string'}
    ]
});