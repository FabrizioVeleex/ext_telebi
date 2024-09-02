/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.top.grids.Note', {
    extend: 'Ext.grid.Panel',
    height: 120,
    hideHeaders: true,
    requires: [
        'Ext.grid.column.Action'
    ],
    xtype: 'grid-filter-note',
    viewConfig:{
        emptyText:Locale.t('skd.top.filtri.grids.note.emptyText')
    },
    columns: [
        {
            width: 25,
            align: 'center',
            sortable: false,
            hideable: false,
            menuDisabled: true,
            draggable: false,
            groupable: false,
            xtype: 'actioncolumn',
            items: [
                {
                    getClass: function (v, meta, r) {
                        meta.tdAttr = 'data-qtip=\"'+r.data['nota']+':<br>Rimuovi questo filtro\"';
                        return 'icon-chiudi';
                    },
                    handler: 'onRemoveFilter'
                }
            ]
        },
        {
            text: 'nota',
            dataIndex: 'nota',
            flex: 1
        }
    ]
});