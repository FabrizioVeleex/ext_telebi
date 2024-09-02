/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.importazioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'impexp.view.grids.importazioni.Controller',
        'impexp.view.grids.importazioni.Model'
    ],
    viewModel: 'importazioni',
    controller: 'importazioni',
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