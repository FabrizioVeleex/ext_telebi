/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.model.grids.Immagini', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.immagini',
    fields: [
        {name: 'yimart', type: 'string',defaultValue:''},
        {name: 'yimfor', type: 'string',defaultValue:''},
        {name: 'yimnom', type: 'string',defaultValue:''},
        {name: 'depar', type: 'string',defaultValue:''},
        {name: 'schfam', type: 'string',defaultValue:''},
        {name: 'schtec', type: 'string',defaultValue:''},
        {name: 'schfun', type: 'string',defaultValue:''}
    ]
});