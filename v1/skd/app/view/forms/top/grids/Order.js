/**
 * Created by fabrizio on 13/03/18.
 */
Ext.define('skd.view.forms.top.grids.Order', {
    extend: 'Ext.grid.Panel',
    height: 120,
    hideHeaders: true,
    requires:[
        'Ext.grid.column.Action'
    ],
    xtype: 'grid-filter-order',
    viewConfig:{
        emptyText:Locale.t('skd.top.filtri.grids.order.emptyText')
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
                        meta.tdAttr = 'data-qtip=\"'+r.data['sc_op_order_no']+' '+r.data['sc_op_release_no']+' '+r.data['sc_op_sequence_no']+':<br>Rimuovi questo filtro\"';
                        return 'icon-chiudi';
                    },
                    handler: 'onRemoveFilter'
                }
            ]
        },
        {
            text: 'field',
            dataIndex: 'field',
            flex: 1
        }
    ]
});