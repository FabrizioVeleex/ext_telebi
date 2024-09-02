/**
 * Created by luca on 16/02/2017.
 */
Ext.define('snp.view.grids.destinatari.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'snp.view.grids.destinatari.Controller',
        'snp.view.grids.destinatari.Model'
    ],
    viewModel: 'v1-destinatari',
    controller: 'v1-destinatari',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    listeners:{
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow',
        itemdblclick:'onitemdblclick'
    }
});