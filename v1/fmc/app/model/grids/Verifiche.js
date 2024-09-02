/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.model.grids.Verifiche', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.verifiche',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'titolo', type: 'string'},
        {name: 'idcorso', type: 'string'},
        {name: 'corso', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'datachk',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'stato',type: 'string'}
    ]
});