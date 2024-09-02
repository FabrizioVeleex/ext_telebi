/**
 * Created by luca on 06/09/16.
 */
Ext.define('amm.model.grids.Alberomenu', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.alberomenu',
    fields: [
        {name: 'iconCls', type: 'string'},{name: 'itemId', type: 'string'},{name: 'text', type: 'string'},
        {name: 'idpadre', type: 'string'},{name: 'padre', type: 'string'},{name: 'tipo', type: 'string'}
    ]
});