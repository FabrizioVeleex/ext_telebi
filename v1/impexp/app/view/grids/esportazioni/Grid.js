/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.esportazioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'impexp.view.grids.esportazioni.Controller',
        'impexp.view.grids.esportazioni.Model'
    ],
    viewModel: 'esportazioni',
    controller: 'esportazioni',
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
        'checkview':'onCheckView'
    }
});