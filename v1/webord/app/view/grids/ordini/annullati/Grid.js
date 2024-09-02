/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('webord.view.grids.ordini.annullati.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'webord.view.grids.ordini.Controller',
        'webord.view.grids.ordini.Model'
    ],
    viewModel: 'v1-ordini',
    controller: 'v1-ordini',
    bind: {
        store: '{storeAnnullati}',
        title: '{titoloannullati}'
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