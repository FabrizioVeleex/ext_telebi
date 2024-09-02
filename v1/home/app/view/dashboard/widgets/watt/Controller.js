/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.watt.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-watt',

    requires: [
        'Ext.grid.column.Action',
        'home.view.dashboard.widgets.watt.store.GridStore',
        'home.view.dashboard.widgets.watt.view.Grid'
    ],
    onAfterRender: function () {
        let widget = this.getView().widget;

        this.getViewModel().set('widget', widget);
        let store = Ext.create('home.view.dashboard.widgets.watt.store.GridStore');
        this.grid = Ext.create('home.view.dashboard.widgets.watt.view.Grid', {
            store: store,
            columns: []
        });
        this.getView().add(this.grid);

    },
    onafterrendergrid: function (grid) {
        grid.myColumns = [
            {
                width: 30,
                align: 'center',
                sortable: false,
                hideable: false,
                menuDisabled: true,
                draggable: false,
                groupable: false,
                xtype: 'actioncolumn',
                items: [
                    {
                        getClass: function () {
                            return 'x-fas fa-eye';
                        },
                        handler: 'onOpenRecord'
                    }
                ]
            }
            , {
                text: Locale.t('watt.columns.inizio'),
                width: 120,
                dataIndex: 'dinizio',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: false,
                draggable: false
            }
            , {
                text: Locale.t('watt.columns.fine'),
                width: 120,
                dataIndex: 'dfine',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                sortable: false,
                draggable: false
            }
            , {
                text: Locale.t('watt.columns.proprietario'),
                dataIndex: 'nomecognome',
                width: 200,
                draggable: false,
                sortable: false,
                filter: {type: 'string'}
            }
            , {
                text: Locale.t('watt.columns.titolo'),
                minWidth: 200,
                dataIndex: 'titolo',
                sortable: false,
                draggable: false
            }
            , {
                text: Locale.t('watt.columns.previsto'),
                dataIndex: 'percentuale',
                resizable: false,
                draggable: false,
                sortable: false,
                align: 'right',
                renderer: function (v) {
                    return '<div class="x-progress x-progress-default" style="height: 24px;background-color: #fafad2"><div class="x-progress-text" role="presentation"><div role="presentation">' + v + '%</div></div><div class="x-progress-bar x-progress-bar-default" style="width: ' + v + '%"><div class="x-progress-text" role="presentation"><div role="presentation">' + v + '%</div></div></div></div>';
                }
            }
            , {
                text: Locale.t('watt.columns.attuale'),
                dataIndex: 'avanzamento',
                resizable: false,
                draggable: false,
                sortable: false,
                align: 'right',
                renderer: function (v, m, r) {
                    let dfine = Ext.Date.parse(r.data['dfine'], 'Y-m-d'),
                        today = new Date(),
                        color = ''

                    if (today > dfine) {
                        color = 'red'
                    }
                    return '<div class="x-progress x-progress-default" style="height: 24px;background-color: ' + color + '"><div class="x-progress-text" role="presentation"><div role="presentation">' + v + '%</div></div><div class="x-progress-bar x-progress-bar-default" style="width: ' + v + '%"><div class="x-progress-text" role="presentation"><div role="presentation">' + v + '%</div></div></div></div>';
                }
            }
        ];
        this.callParent(arguments)
    },
    onReloadGrid: function () {
        let lista = this.grid;
        lista.getStore().load();
    },
    onOpenRecord: function (grid, rowIndex) {
        let rec = grid.getStore().getAt(rowIndex);
        this.getView().dashboard.onOpenAppNotifiche({
            iconCls: 'ATT-16',
            iconCls32: 'ATT-32',
            iconCls64: 'ATT-64',
            tag: 'ATT',
            appui: 'att',
            target: 'frame',
            text: Locale.t('watt.title'),
            datiApertura: {tabella: 'TBATTREC01', id: rec.data.id, idrecord: rec.data.id},
            tipo: 'app6',
            url: '',
            id: rec.data.id,
            idrecord: rec.data.id,
            tabella: 'TBATTREC01'
        })
    },
    onAfterRenderGrid: function (grid) {
        grid.getStore().load();
    },
    onOpenApp: function (btn) {
        this.getView().dashboard.onOpenAppNotifiche({
            appui: 'att',
            iconCls: 'ATT-16',
            iconCls32: 'ATT-32',
            iconCls64: 'ATT-64',
            tag: 'ATT',
            target: 'frame',
            text: Locale.t('watt.title'),
            tipo: 'app6',
            url: ''
        })
    }
});
