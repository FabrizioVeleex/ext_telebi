/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.top.grids.Reparto', {
    extend: 'Ext.grid.Panel',
    height: 120,
    hideHeaders: true,
    requires:[
        'Ext.grid.column.Action'
    ],
    xtype: 'grid-filter-reparto',
    viewConfig:{
        emptyText:Locale.t('skd.top.filtri.grids.reparto.emptyText')
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
                        meta.tdAttr = 'data-qtip=\"'+r.data['rep_cdl_department_no']+':<br>Rimuovi questo filtro\"';
                        return 'icon-chiudi';
                    },
                    handler: 'onRemoveFilter'
                }
            ]
        },
        {
            text: 'rep_cdl_department_no',
            dataIndex: 'rep_cdl_department_no',
            flex: 1
        }
    ]
});