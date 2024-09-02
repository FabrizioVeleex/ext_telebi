/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.model.grids.Lingue', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.lingue',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'codice',defaultValue:''},
        {name: 'descrizione',defaultValue:''}
    ]
});