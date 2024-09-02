/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.corsi.Effettuati', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.corsi.Controller',
        'fmc.view.grids.corsi.Model'
    ],
    viewModel: 'corsi',
    controller: 'corsi',
    bind: {
        store: '{storeEffettuati}',
        title: '{titoloEffettuati}'
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