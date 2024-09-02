/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('snp.view.grids.schede.chiuse.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'snp.view.grids.schede.Controller',
        'snp.view.grids.schede.Model'
    ],
    viewModel: 'v1-schede',
    controller: 'v1-schede',
    bind: {
        store: '{storeChiuse}',
        title: '{titolochiuse}'
    },
    columns: [],
    listeners:{
        itemdblclick:'onitemdblclick',
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow',
        'checkcolumn':'checkColumn'
    }
});