/**
 * Created by fabrizio on 13/03/18.
 */
Ext.define('skd.view.forms.top.grids.Odp', {
    extend: 'Ext.grid.Panel',
    height: 120,
    hideHeaders: true,
    requires:[
        'Ext.grid.column.Action'
    ],
    xtype: 'grid-filter-odp',
    viewConfig:{
        emptyText:Locale.t('skd.top.filtri.grids.odp.emptyText')
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
                        meta.tdAttr = 'data-qtip=\"'+r.data['sc_op_objstate']+':<br>Rimuovi questo filtro\"';
                        return 'icon-chiudi';
                    },
                    handler: 'onRemoveFilter'
                }
            ]
        },
        {
            text: 'sc_op_objstate',
            dataIndex: 'sc_op_objstate',
            flex: 1
        }
    ]
});