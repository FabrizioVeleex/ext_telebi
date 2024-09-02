Ext.define('dip.view.grids.utenti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.utenti.Controller',
        'dip.view.grids.utenti.Model'
    ],
    viewModel: 'dipendenti',
    controller: 'dipendenti',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },

    listeners:{
        itemdblclick:'onitemdblclick',
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow'
    }
});