/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.model.grids.Prodotti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.prodotti',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'schcdr',defaultValue:''},
        {name: 'italiano',defaultValue:''},
        {name: 'inglese',defaultValue:''}
    ]
});