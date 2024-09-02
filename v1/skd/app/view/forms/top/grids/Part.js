/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.top.grids.Part', {
    extend: 'Ext.grid.Panel',
    height: 120,
    hideHeaders: true,
    requires:[
        'Ext.grid.column.Action'
    ],
    xtype: 'grid-filter-part',
    viewConfig:{
        emptyText:Locale.t('skd.top.filtri.grids.part.emptyText')
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
                        meta.tdAttr = 'data-qtip=\"'+r.data['sc_op_part_no']+':<br>Rimuovi questo filtro\"';
                        return 'icon-chiudi';
                    },
                    handler: 'onRemoveFilter'
                }
            ]
        },
        {
            text: 'sc_op_part_no',
            dataIndex: 'sc_op_part_no',
            flex: 1
        }
    ]
});