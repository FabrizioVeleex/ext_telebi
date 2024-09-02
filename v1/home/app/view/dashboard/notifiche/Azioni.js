/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.notifiche.Azioni', {
    extend: 'Ext.grid.Panel',
    xtype: 'v1-grid-azioni',
    requires: [
        'home.view.dashboard.notifiche.store.Azioni',
        'home.view.dashboard.notifiche.Search',
        'Ext.grid.feature.Grouping',
        'Ext.grid.column.Template',
        'Ext.grid.column.Action'
    ],
    ui: 'red',
    hideHeaders: true,
    cls: 'gridAzioni',
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<div>' +
            '   <span style="vertical-align: middle;"><img style="width:16px;height:16px;border:none;" src="/images/s.gif" class="{[values.rows[0].data.tag]}-16" />&nbsp;</span>' +
            '   <span style="color:black;font-weight: bold;">{name}</span>' +
            '</div>',
        hideGroupedHeader: true,
        enableGroupingMenu: false,
        remoteRoot: 'data'
    }],
    viewConfig: {
        emptyText: Locale.t('home.notifiche.azioni.emptytext')
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                { xtype: 'v1-notifiche-search', grid: 'azioni' },
                { grid: 'azioni', iconCls: 'pictos pictos-refresh', handler: 'onRefreshGridAzioni' }
            ]
        }
    ],

    initComponent: function () {
        let me = this;
        this.tpl = Ext.create('Ext.XTemplate',
            '<tpl for="."><div class="selezione" style="white-space:pre-wrap;padding:2px;">',
            '<span style="color:#2b2b2b;font-style: italic">{datadoc:date("d/m/Y H:i ")}</span><span style="color:#2b2b2b;font-weight: bold;">{mittente}</span><br />',
            '  <span style="color:black;">{descrizione}</span>',
            '	<tpl if="motivazione !=\'\'"><div style="border: 1px solid #999999;padding:2px;">{motivazione}</div></tpl>',
            '</div></tpl>'
        );
        this.store = Ext.create('home.view.dashboard.notifiche.store.Azioni', {
            groupField: 'titolo',
            grid: me
        });
        this.columns = [
            {
                xtype: 'actioncolumn',
                actiontype: 'azioni',
                width: 33,
                menuDisabled: true,
                resizable: false,
                items: [{
                    handler: 'onOpenRecordNotifica',
                    iconCls: 'x-fas fa-eye',
                    tooltip: Locale.t('global.btn.openrecord')
                }]
            },
            { flex: 1, dataIndex: 'titolo' }, { text: 'Descrizione', flex: 1, xtype: 'templatecolumn', tpl: this.tpl }
        ];
        me.callParent();
    }
});
