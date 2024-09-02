/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.corsi.Storici', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.corsi.Controller',
        'fmc.view.grids.corsi.Model'
    ],
    viewModel: 'corsi',
    controller: 'corsi',
    bind: {
        store: '{storeStorici}',
        title: '{titoloStorici}'
    },
    columns: [],
    listeners:{
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow',
        itemdblclick:'onitemdblclick',
        'checkcolumn':'checkColumn'
    }
});