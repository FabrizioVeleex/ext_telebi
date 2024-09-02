/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.famcausali.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.famcausali.Controller',
        'rec.view.grids.famcausali.Model'
    ],
    viewModel: 'famcausali',
    controller: 'famcausali',
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