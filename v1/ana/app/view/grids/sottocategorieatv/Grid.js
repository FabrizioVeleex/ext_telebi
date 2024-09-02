/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.sottocategorieatv.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.sottocategorieatv.Model',
        'ana.view.grids.sottocategorieatv.Controller'
    ],
    viewModel: 'sottocategorieatv',
    controller: 'sottocategorieatv',
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