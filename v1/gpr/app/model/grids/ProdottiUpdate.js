/**
 * Created by luca on 15/11/2016.
 */
Ext.define('gpr.model.grids.ProdottiUpdate', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'descrizione',defaultValue:''},
        {name: 'inizio',defaultValue:''},
        {name: 'fine',defaultValue:''}
    ]
});