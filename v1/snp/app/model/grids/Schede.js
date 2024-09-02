/**
 * Created by luke on 01/08/22.
 */
Ext.define('snp.model.grids.Schede', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.schede',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'tipologia', type: 'string'},
        {name: 'datadoc',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'step', type: 'int'},
        {name: 'marca', type: 'string'},
        {name: 'modello', type: 'string'},
        {name: 'codiceoe', type: 'string'}
    ]
});