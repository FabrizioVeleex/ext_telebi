/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.top.grids.Lab', {
    extend: 'Ext.grid.Panel',
    height: 120,
    hideHeaders: true,
    requires:[
        'Ext.grid.column.Action'
    ],
    xtype: 'grid-filter-lab',
    viewConfig:{
        emptyText:Locale.t('skd.top.filtri.grids.lab.emptyText')
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
            cls:'goma-row-xx-small',
            items: [
                {
                    getClass: function (v, meta, r) {
                        // meta.tdCls ='goma-row-xx-small';
                        meta.tdAttr = 'data-qtip=\"'+r.data['sc_op_lab']+':<br>Rimuovi questo filtro\"';
                        return 'icon-chiudi';
                    },
                    handler: 'onRemoveFilter'
                }
            ]
        },
        {
            cls:'goma-row-xx-small',
            text: 'sc_op_lab',
            dataIndex: 'sc_op_lab',
            flex: 1
        }
    ]
});