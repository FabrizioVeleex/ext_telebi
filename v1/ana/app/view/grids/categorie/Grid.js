/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.categorie.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.categorie.Model',
        'ana.view.grids.categorie.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'categorie',
    controller: 'categorie',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text: Locale.t('ana.grids.categorie.column.categoria'), dataIndex: 'categoria', flex:1, filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});