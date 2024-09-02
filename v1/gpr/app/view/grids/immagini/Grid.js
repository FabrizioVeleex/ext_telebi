/**
 * Created by luke on 18/11/22.
 */
Ext.define('gpr.view.grids.immagini.Grid', {
    extend: 'Ext.grid.GridPanel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.filters.Filters',
        'gpr.view.grids.immagini.Controller',
        'gpr.view.grids.immagini.Model'
    ],
    autoLoad: true, //autoLoad = false non funziona se è attivato il pligin gridfilters #baco conosciuto

    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        showHeaderCheckbox:false
    },
    plugins: [{
        ptype: 'gridfilters',
        menuFilterText: 'Filtri'
    }],
    viewModel: 'immagini',
    controller: 'immagini',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [
        {text: Locale.t('gpr.grids.immagini.column.yimart'), dataIndex: 'yimart',width:180, filter: {type: 'string'}},
        {text: Locale.t('gpr.grids.immagini.column.depar'), dataIndex: 'depar', flex:1,filter: {type: 'string'}},
        {text: Locale.t('gpr.grids.immagini.column.yimfor'), dataIndex: 'yimfor', width:120,filter: {type: 'string'}},
        {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
            items: [{handler: 'onScaricaImgSingola', iconCls: 'x-fas fa-download', tooltip: Locale.t('global.download.startdownload')}]
        },
        {text: Locale.t('gpr.grids.immagini.column.yimnom'), dataIndex: 'yimnom', width:200,filter: {type: 'string'}},
        {text: Locale.t('gpr.grids.immagini.column.schfam'), dataIndex: 'schfam', width:120,filter: {type: 'string'}},
        {text: Locale.t('gpr.grids.immagini.column.schfun'), dataIndex: 'schfun', width:120,filter: {type: 'string'}},
        {text: Locale.t('gpr.grids.immagini.column.schtec'), dataIndex: 'schtec', width:120,filter: {type: 'string'}}
    ]
});