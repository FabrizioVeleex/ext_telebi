/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.categorieatv.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.categorieatv.Model',
        'ana.view.grids.categorieatv.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'categorieatv',
    controller: 'categorieatv',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text: Locale.t('ana.grids.categorieatv.column.nome'), dataIndex: 'nome', flex:1, filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});