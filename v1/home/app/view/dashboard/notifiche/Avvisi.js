/**
 * Created by fabrizio on 21/07/21.
 */
let bdOverBtnGroupAvvisi = false;
Ext.define('home.view.dashboard.notifiche.Avvisi', {
    extend: 'Ext.grid.Panel',
    xtype: 'v1-grid-avvisi',
    requires: [
        'home.view.dashboard.notifiche.store.Avvisi',
        'home.view.dashboard.notifiche.Search',
        'Ext.grid.column.Template',
        'home.view.dashboard.notifiche.Grouping',
        'Ext.grid.column.Action'
    ],
    hideHeaders: true,
    cls: 'gridAvvisi',
    features: [{
        ftype: 'v1-groupingNotifiche',
        groupHeaderTpl: new Ext.XTemplate('<tpl for="."><div>' +
            '   <span style="vertical-align: middle;"><img style="width:16px;height:16px;border:none;" src="/images/s.gif" class="{[values.rows[0].data.tag]}-16" />&nbsp;</span>' +
            '   <span style="color:black;font-weight: bold;">{name}</span>' +
            '<span style="float:right;width:16px;height:16px;" class="x-action-col-icon x-action-col-0  x-fa fa-remove" onmouseover=bdOverBtnGroupAvvisi=true onmouseout=bdOverBtnGroupAvvisi=false></span>' +
            '</div></tpl>'),
        hideGroupedHeader: true,
        remoteRoot: 'data'

    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                { xtype: 'v1-notifiche-search', name: 'query', grid: 'avvisi' },
                { grid: 'avvisi', iconCls: 'pictos pictos-refresh', handler: 'onRefreshGridAvvisi' },
                {
                    ui: 'red',
                    iconCls: 'fas fa-trash',
                    handler: 'onRemoveGridAvvisiAll',
                    text: Locale.t('home.notifiche.btn.removeavvisi.text')
                }
            ]
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            actiontype: 'avvisi',
            width: 33,
            menuDisabled: true,
            resizable: false,
            items: [{
                handler: 'onOpenRecordNotifica',
                iconCls: 'x-fas fa-eye',
                tooltip: Locale.t('global.btn.openrecord')
            }]
        },
        { flex: 1, dataIndex: 'titolo' },
        {
            flex: 1, xtype: 'templatecolumn',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for="."><div class="selezione" style="white-space:pre-wrap;padding:2px;">',
                '<span style="color:#2b2b2b;font-style: italic">{datadoc:date("d/m/Y H:i ")}</span><span style="color:#2b2b2b;font-weight: bold;">{mittente}</span><br />',
                '  <span style="color:black;">{descrizione}</span>',
                '	<tpl if="motivazione !=\'\'"><div style="border: 1px solid #999999;padding:2px;">{motivazione}</div></tpl>',
                '</div></tpl>'
            )
        },
        {
            xtype: 'actioncolumn',
            dataIndex: 'id',
            width: 33,
            menuDisabled: true,
            resizable: false,
            items: [{
                handler: 'onRemoveGridAvvisi',
                iconCls: 'x-fas fa-trash'
            }]
        }
    ],
    initComponent: function () {
        let me = this;
        this.store = Ext.create('home.view.dashboard.notifiche.store.Avvisi', {
            groupField: 'titolo',
            grid: me
        });
        Ext.apply(this, {
            viewConfig: {
                emptyText: Locale.t('home.notifiche.avvisi.emptytext'),
                listeners: {
                    groupclick: 'onRemoveGridAvvisiHeader'
                }
            }
        });
        me.callParent();
    }
});
