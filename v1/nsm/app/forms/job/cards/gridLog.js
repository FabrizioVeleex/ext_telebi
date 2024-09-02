/**
 * Created by fabrizio on 09/03/21.
 */
Ext.define('nsm.view.forms.job.cards.gridLog', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'Ext.form.field.Display',
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.column.Date',
        'Ext.toolbar.Fill'
    ],
    forceFit: true,
    autoLoad: false,
    bind: {
        store: '{gridLog}'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'textfield',
                    width: 300,
                    hasSearch: false,
                    paramName: 'query',
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            hidden: true,
                            handler: 'onClearTriggetSearch'
                        },
                        search: {
                            cls: 'x-form-search-trigger',
                            handler: 'onSearchTriggetSearch'
                        }
                    },
                    listeners: {
                        specialkey: 'onSpecialkeySearch'
                    }
                },
                {xtype: 'tbfill'},
                {
                    xtype: 'displayfield',
                    itemId: 'totalCount'
                }
            ]
        }
    ],
    columns: [
        {
            text: Locale.t('nsm.forms.job.cards.gridlog.column.idday'),
            sortable: false,
            dataIndex: 'idDay',
            width: 100,
            minWidth: 100,
            filter: {type: 'string'}
        },
        {
            xtype: 'actioncolumn',
            sortable: false,
            width: 30,
            minWidth: 30,
            menuDisabled: true,
            resizable: false,
            items: [
                {
                    getClass: function (view, meta, record) {
                        if (record.get('esito') === 0) {
                            return "bd-action-null x-fas fa-running bd-color-blue";
                        }
                        if (record.get('esito') === 2) {
                            return "bd-action-null x-fas fa-exclamation-triangle bd-color-orange";
                        }
                        if (record.get('esito') === 3) {
                            return "bd-action-null x-fas fa-exclamation-circle bd-color-red";
                        }
                        return "";
                    }
                }]
        },
        {
            text: Locale.t('nsm.forms.job.cards.gridlog.column.message'),
            dataIndex: 'esito',
            sortable: false,
            flex:1,
            minWidth: 150,
            renderer: function (value, meta) {
                if (value===0) {
                    meta.tdCls = ' column-color-blue';
                    return Locale.t('nsm.forms.job.cards.gridlog.esito.run');
                }
                if (value === 1) {
                    meta.tdCls = ' column-color-green';
                    return Locale.t('nsm.forms.job.cards.gridlog.esito.ok');
                }
                if (value === 2) {
                    meta.tdCls = ' column-color-orange';
                    return Locale.t('nsm.forms.job.cards.gridlog.esito.warning');
                }
                if (value === 3) {
                    meta.tdCls = ' column-color-red';
                    return Locale.t('nsm.forms.job.cards.gridlog.esito.error');
                }
                meta.tdCls = ' column-color-red';
                return '[n.d.]';
            },
            filter: {type: 'string'}
        },
        {
            text: Locale.t('nsm.forms.job.cards.gridlog.column.startjob'),
            sortable: false,
            dataIndex: 'startJob',
            width: 180,
            minWidth: 180,
            xtype: 'datecolumn',
            format: 'H:i:s',
            filter: {type: 'date', dateFormat: 'c'}
        },
        {
            text: Locale.t('nsm.forms.job.cards.gridlog.column.stopjob'),
            sortable: false,
            dataIndex: 'stopJob',
            width: 180,
            minWidth: 180,
            xtype: 'datecolumn',
            format: 'H:i:s',
            filter: {type: 'date', dateFormat: 'c'}
        },
    ],
    listeners: {
        itemclick: 'onItemClickLog'
    }
});