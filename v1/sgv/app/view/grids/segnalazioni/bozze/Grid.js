/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sgv.view.grids.segnalazioni.bozze.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sgv.view.grids.segnalazioni.Controller',
        'sgv.view.grids.segnalazioni.Model'
    ],
    viewModel: 'v1-segnalazioni',
    controller: 'v1-segnalazioni',
    bind: {
        store: '{storeBozze}',
        title: '{titolobozze}'
    },
    multiSelect:true,
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