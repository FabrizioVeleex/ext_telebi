/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.view.grids.ListDateRange', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Check',
        'Ext.util.Format'
    ],
    viewConfig: {
        markDirty: false,
        stripeRows: true,
        enableTextSelection: true,
        emptyText: Locale.t('skd.top.filtri.movedaterange.emptyText')
    },
    columns: {
        items: [
            {
                text: Locale.t('skd.grids.columns.lab'),
                dataIndex: 'lab',
                flex: 1,
                minWidth: 150
            },
            {
                text: Locale.t('skd.grids.columns.part_no'),
                dataIndex: 'part_no',
                flex: 1,
                minWidth: 150
            },
            {
                text: Locale.t('skd.grids.columns.order_no'),
                dataIndex: 'order_no',
                width: 70
            },
            {
                text: Locale.t('skd.grids.columns.new_start'),
                dataIndex: 'local_start_time',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                width: 120
            },
            {
                text: Locale.t('skd.grids.columns.new_end'),
                dataIndex: 'local_end_time',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                width: 120
            },
            {
                text: Locale.t('skd.grids.columns.start_time'),
                dataIndex: 'start_time',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                width: 120
            },
            {
                text: Locale.t('skd.grids.columns.end_time'),
                dataIndex: 'end_time',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                width: 120
            },
            {
                text: Locale.t('skd.grids.columns.qty'),
                dataIndex: 'sc_op_res_ordine',
                width: 90
            },
            {
                xtype:'checkcolumn',
                dataIndex: 'seleziona',
                headerCheckbox:true,
                text: Locale.t('skd.grids.columns.seleziona')
            }
        ],
        defaults: {
            menuDisabled: true,
            sortable: false
        }
    }
});
